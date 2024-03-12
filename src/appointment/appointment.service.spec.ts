import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from './appointment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Appointment, DoctorAvailability, Slot } from './entities/appointment.entity';
import { Patient } from '../patient/entities/patient.entity';
import { Doctor } from '../doctors/entities/doctor.entity';

describe('AppointmentService', () => {
  let service: AppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<AppointmentService>(AppointmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
