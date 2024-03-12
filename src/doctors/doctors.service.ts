import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class DoctorsService {
  constructor(@InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
    const doctor = new Doctor();
    doctor.id = uuid();
    doctor.name = createDoctorDto.name;
    doctor.department = createDoctorDto.department;
    doctor.phoneNumber = createDoctorDto.phoneNumber;
    doctor.email = createDoctorDto.email;
    doctor.createdAt = new Date();
    doctor.updatedAt = new Date();
    try {
      return await this.doctorRepository.save(doctor);;
    } catch (error) {
      console.log(error);
      if(error.toString().startsWith('QueryFailedError: duplicate key value violates unique constraint')) {
        return 'Doctor already exists';
      }
      return error;
    }
  }

  async findAll() {
    const allDoctors = await this.doctorRepository.find();
    return allDoctors;
  }

  async findOne(id: string) {
    const doctor = await this.doctorRepository.findOne({where: {id: id}});
    return doctor;
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    const doctorToUpdate = await this.doctorRepository.findOne({where: {id: id}});
    if(!doctorToUpdate) return;
    doctorToUpdate.name = updateDoctorDto.name;
    doctorToUpdate.department = updateDoctorDto.department;
    doctorToUpdate.phoneNumber = updateDoctorDto.phoneNumber;
    doctorToUpdate.email = updateDoctorDto.email;
    doctorToUpdate.updatedAt = new Date();
    return await this.doctorRepository.save(doctorToUpdate);
  }

  async remove(id: string) {
    return await this.doctorRepository.delete(id);
  }
}

