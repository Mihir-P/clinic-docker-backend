import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';

describe('PatientService', () => {
  let service: PatientService;

  const mockRepository = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientService,
        {
          provide: getRepositoryToken(Patient),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PatientService>(PatientService);
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should create a patient', async () => {

    const createPatientDto = {
      name: 'John Doe',
      dateOfBirth: new Date("2000-07-05"),
      phoneNumber: '1234567890',
      email: 'johndoe@mail.com',
    } as CreatePatientDto;

    const patient = {
      "id": "c53e09aa-051b-4e83-befc-e3945544997b",
      "name": "John Doe",
      "dateOfBirth": new Date("2000-07-05"),
      "phoneNumber": "1234567890",
      "email": "johndoe@mail.com",
      "createdAt": new Date(),
      "updatedAt": new Date(),
      "appointments": [],
    } as Patient;

    jest.spyOn(service, 'create').mockResolvedValue(patient);

    const result = await service.create(createPatientDto);
    
    expect(service.create).toHaveBeenCalled();
    expect(result).toBe(patient);
  });

  it('Should return all patients', async () => {
    const allPatients = [
      {
        "id": "c53e09aa-051b-4e83-befc-e3945544997b",
        "name": "John Doe",
        "dateOfBirth": new Date("2000-07-05"),
        "phoneNumber": "1234567890",
        "email": "johndoe@mail.com",
        "createdAt": new Date(),
        "updatedAt": new Date(),
        "appointments": [],
      }
    ]

    jest.spyOn(service, 'findAll').mockResolvedValue(allPatients);

    const result = await service.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toBe(allPatients);

  });

  it('Should return one Specific patient', async () => {

    const patient = {
      id: "c53e09aa-051b-4e83-befc-e3945544997b",
      name: "John Doe",
      dateOfBirth: new Date("2000-07-05"),
      phoneNumber: "1234567890",
      email: "johndoe@mail.com",
      createdAt: new Date(),
      updatedAt: new Date(),
      appointments: [],
    } as Patient;

    jest.spyOn(service, 'findOne').mockResolvedValue(patient);

    const result = await service.findOne(patient.id as string);
    
    expect(service.findOne).toHaveBeenCalled();
    expect(result).toBe(patient);

  });

  it('Should update a patient', async () => {
    const patientId = "c53e09aa-051b-4e83-befc-e3945544997b";

    const updatedPatient = {
      id: "c53e09aa-051b-4e83-befc-e3945544997b",
      name: "John Doe",
      dateOfBirth: new Date("2000-07-05"),
      phoneNumber: "1234567890",
      email: "johndoenew@mail.com",
      createdAt: new Date(),
      updatedAt: new Date(),
      appointments: [],
    } as Patient;

    const updatePatientDto = {
      name: 'John Doe',
      dateOfBirth: new Date("2000-07-05"),
      phoneNumber: '1234567890',
      email: "johndoenew@mail.com",
    } as CreatePatientDto;

    
    jest.spyOn(service, 'update').mockResolvedValue(updatedPatient);

    const result = await service.update(patientId, updatePatientDto);

    expect(service.update).toHaveBeenCalled();
    expect(result).toBe(updatedPatient);
  
  });

  it('Should delete a patient', async () => {
    const patientId = "c53e09aa-051b-4e83-befc-e3945544997b";

    const deletePatientResponse = {
      "raw": [],
      "affected": 1
    };

    jest.spyOn(service, 'remove').mockResolvedValue(deletePatientResponse);

    const result = await service.remove(patientId);

    expect(service.remove).toHaveBeenCalled();
    expect(result).toEqual(deletePatientResponse);

    // Check if the Paitent is indeed deleted
    const patient = await service.findOne(patientId);
    expect(patient).toBeUndefined();

  });

  it('Should not create a patient with the same contact number', async () => {

    const createPatientDto = {
      name: 'John Doe',
      dateOfBirth: new Date("2000-07-05"),
      phoneNumber: '1234567890',
      email: '',
    } as CreatePatientDto;

    jest.spyOn(service, 'create').mockResolvedValue('Patient already exists');

    const result = await service.create(createPatientDto);

    expect(service.create).toHaveBeenCalled();
    expect(result).toBe('Patient already exists');
  });

});

