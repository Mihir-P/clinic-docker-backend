import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { Appointment, DoctorAvailability, Slot } from './entities/appointment.entity';
import { Patient } from '../patient/entities/patient.entity';
import { Doctor } from '../doctors/entities/doctor.entity';

describe('AppointmentController', () => {
  let controller: AppointmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentController],
      providers: [
        AppointmentService,
        {
          provide: getRepositoryToken(Appointment),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Slot),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Patient),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Doctor),
          useValue: {},
        },
        {
          provide: getRepositoryToken(DoctorAvailability),
          useValue: {}
        }
      ],
    }).compile();

    controller = module.get<AppointmentController>(AppointmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
