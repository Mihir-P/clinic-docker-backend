import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment, Slot, DoctorAvailability } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { AddAvailabilityDto } from './dto/add-availability-dto';
import { Doctor } from '../doctors/entities/doctor.entity';
import { Patient } from '../patient/entities/patient.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(DoctorAvailability)
    private doctorAvailabilityRepository: Repository<DoctorAvailability>,
    @InjectRepository(Slot)
    private slotsRepository: Repository<Slot>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {

    const availablility  = await this.doctorAvailabilityRepository.exists({
      where: {
        slot: createAppointmentDto.requestedSlot,
        date: createAppointmentDto.appointmentDate,
      }
    });

    if (!availablility) {
      return 'UNAVAILABLE';
    }

    const slotBooked = await this.appointmentRepository.findOne({
      where: { 
          doctor: {id: createAppointmentDto.doctorId},
          slot: createAppointmentDto.requestedSlot,
          appointmentDate: createAppointmentDto.appointmentDate,
        },
    });

    if (slotBooked) {
      return 'BOOKED';
    }

    const appointment = new Appointment();
    appointment.id = uuid();
    appointment.appointmentDate = createAppointmentDto.appointmentDate;
    appointment.patient = await this.patientRepository.findOne({
      where: { id: createAppointmentDto.patientId },
    });
    appointment.doctor = await this.doctorRepository.findOne({
      where: { id: createAppointmentDto.doctorId },
    });
    appointment.createdAt = new Date();
    appointment.updatedAt = new Date();
    appointment.isCanceled = false;
    return await this.appointmentRepository.save(appointment);
  }

  async findAll() {
    return await this.appointmentRepository.find();
  }

  async findOne(id: string) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id: id },
    });
    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointmentToUpdate = await this.appointmentRepository.findOne({
      relations: ['doctor'],
      where: { id: id },
    });
    if (!appointmentToUpdate) return;
    appointmentToUpdate.appointmentDate = updateAppointmentDto.appointmentDate;
    
    if(appointmentToUpdate.doctor.id !== updateAppointmentDto.doctorId) {
      appointmentToUpdate.doctor = await this.doctorRepository.findOne({
        where: { id: updateAppointmentDto.doctorId },
      });
    }
    appointmentToUpdate.isCanceled = updateAppointmentDto.isCanceled;
    appointmentToUpdate.updatedAt = new Date();
    return await this.appointmentRepository.save(appointmentToUpdate);
  }

  async findByDoctor(id: string, on: Date) {
    return await this.appointmentRepository.find({
      where: {
        doctor: {id: id},
        appointmentDate: on,
      },
    });
  }

  async findByPatient(id: string) {
    return await this.appointmentRepository.find({
      where: {
        patient: {id: id},
      },
    });
  }

  async findAvailableSlots(doctorId: string, forDate: Date) {
    
    const doctorAvailabilities = await this.doctorAvailabilityRepository.find({
      relations: ['slot'],
      where: {
        doctor: {id: doctorId},
        date: forDate,
      },
    });

    const doctorAppointments = await this.appointmentRepository.find({
      where: {
        doctor: {id: doctorId},
        appointmentDate: forDate,
      },
    });

    const availableSlots = doctorAvailabilities.filter((availability) => !doctorAppointments.some((appointment) => appointment.slot.id === availability.slot.id));
    return availableSlots;
  }

  async allSlots() {
    return await this.slotsRepository.find();
  }
  
  async addAvailability(createAvailabilityDto: AddAvailabilityDto) {
    const availability = new DoctorAvailability();
    availability.id = uuid();
    availability.doctor = await this.doctorRepository.findOne({
      where: { id: createAvailabilityDto.doctorId },
    });
    availability.slot = await this.slotsRepository.findOne({
      where: { id: createAvailabilityDto.slotId },
    });
    availability.date = createAvailabilityDto.date;
    availability.createdAt = new Date();
    availability.updatedAt = new Date();
    return await this.doctorAvailabilityRepository.save(availability);
  }

}
