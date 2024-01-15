import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './patient/patient.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Patient } from './patient/entities/patient.entity';
import { DoctorsModule } from './doctors/doctors.module';
import { Doctor } from './doctors/entities/doctor.entity';
import { AppointmentModule } from './appointment/appointment.module';
import { Appointment, Slot, DoctorAvailability } from './appointment/entities/appointment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }), 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Patient, Doctor, Appointment, Slot, DoctorAvailability],
      synchronize: true
    }),
    PatientModule, DoctorsModule, AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
