import { Controller, Get, Post, Body, Patch, Param, Delete, Put, BadRequestException, Query } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AddAvailabilityDto } from './dto/add-availability-dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('add-available-slot/')
  async addAvailability(@Body () addAvailability: AddAvailabilityDto) {
    return await this.appointmentService.addAvailability(addAvailability);
  }

  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    const createdRepository = await this.appointmentService.create(createAppointmentDto);
    if (createdRepository === 'UNAVAILABLE') throw new BadRequestException('Doctor is not available for the requested slot');
    if (createdRepository === 'BOOKED') throw new BadRequestException('Slot is already booked');
    return createdRepository;
  }

  @Get('for-doctor/:doctorId')
  async findByDoctor(@Param('doctorId') doctorId: string, @Query() queryParams: any) {
    if (!queryParams.forDate) throw new BadRequestException('Date is required');
    return await this.appointmentService.findByDoctor(doctorId, queryParams.forDate);
  }

  @Get('for-patient/:patientId')
  async findByPatient(@Param('id') id: string) {
    return await this.appointmentService.findByPatient(id);
  }

  @Get('available-slots/:doctorId')
  async findAvailableSlots(@Param('doctorId') doctorId: string, @Query() queryParams: any) {
    if (!queryParams) throw new BadRequestException('Date is required');
    return await this.appointmentService.findAvailableSlots(doctorId, queryParams.forDate);
  }

  @Get('get-slots')
  async allSlots() {
    return await this.appointmentService.allSlots();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    const updateAppointment = await this.appointmentService.update(id, updateAppointmentDto);
    if (!updateAppointment) throw new BadRequestException('Appointment not found');
    return updateAppointment;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.appointmentService.findOne(id);
  }

  @Get()
  async findAll() {
    return await this.appointmentService.findAll();
  }
  
}
