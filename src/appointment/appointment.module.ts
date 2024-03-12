import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment, DoctorAvailability, Slot } from './entities/appointment.entity';
import { SlotSeederService } from './slot.seeder';
import { Doctor } from '../doctors/entities/doctor.entity';
import { Patient } from '../patient/entities/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Slot, Appointment, DoctorAvailability, Doctor, Patient])],
  controllers: [AppointmentController],
  providers: [AppointmentService, SlotSeederService],
  exports: [SlotSeederService]
})
export class AppointmentModule {}
