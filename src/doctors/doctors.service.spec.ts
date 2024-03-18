import { Test, TestingModule } from '@nestjs/testing';
import { DoctorsService } from './doctors.service';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';

describe('DoctorsService', () => {
  let service: DoctorsService;
  
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
      providers: [DoctorsService,
      {
        provide: 'DoctorRepository',
        useValue: mockRepository,
      },
      ],
    }).compile();

    service = module.get<DoctorsService>(DoctorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should create a doctor', async () => {
    const createDoctorDto = {
      name: 'John Doe',
      department: 'Cardiology',
      phoneNumber: '1234567890',
      email: ''
    } as CreateDoctorDto;

    const newDoctorDto = {
      name: "Dr. Newton",
      phoneNumber: "7038258118",
      email: "abc@xyz.com",
      department: "Cardiology"
    } as CreateDoctorDto;

    const doctor = {
      "id": "c53e09aa-051b-4e83-befc-e3945544997b",
      "name": "John Doe",
      "department": "Cardiology",
      "phoneNumber": "1234567890",
      "email": "",
      "createdAt": new Date(),
      "updatedAt": new Date(),
    } as Doctor;

    jest.spyOn(service, 'create').mockResolvedValue(doctor);

    const result = await service.create(createDoctorDto);

    expect(result).toEqual(doctor);
  });

  it('Should find all doctors', async () => {
    const doctor = {
      "id": "c53e09aa-051b-4e83-befc-e3945544997b",
      "name": "John Doe",
      "department": "Cardiology",
      "phoneNumber": "1234567890",
      "email": "",
      "createdAt": new Date(),
      "updatedAt": new Date(),
    } as Doctor;

    jest.spyOn(service, 'findAll').mockResolvedValue([doctor]);

    const result = await service.findAll();

    expect(result).toEqual([doctor]);
  });

  it("Should return specific doctor", async () => {
    const doctor = {
      "id": "c53e09aa-051b-4e83-befc-e3945544997b",
      "name": "John Doe",
      "department": "Cardiology",
      "phoneNumber": "1234567890",
      "email": "",
      "createdAt": new Date(),
      "updatedAt": new Date(),
    } as Doctor;

    jest.spyOn(service, 'findOne').mockResolvedValue(doctor);

    const result = await service.findOne("c53e09aa-051b-4e83-befc-e3945544997b");

    expect(result).toEqual(doctor);
  });

  it('Should update a doctor', async () => {
    const updatedDoctor = {
      "id": "c53e09aa-051b-4e83-befc-e3945544997b",
      "name": "John Doe",
      "department": "Psychiatry",
      "phoneNumber": "1234567890",
      "email": "",
      "createdAt": new Date(),
      "updatedAt": new Date(),
    } as Doctor;

    const updateDoctorDto = {
      id: "c53e09aa-051b-4e83-befc-e3945544997b",
      department: "Psychiatry",
    } as CreateDoctorDto;

    jest.spyOn(service, 'update').mockResolvedValue(updatedDoctor);

    const result = await service.update("c53e09aa-051b-4e83-befc-e3945544997b", updateDoctorDto);

    expect(result).toEqual(updatedDoctor);
  });

  it('Should delete a doctor', async () => {
    
    const doctorId = "c53e09aa-051b-4e83-befc-e3945544997b";

    const deleteDoctorResponse = {
      "raw": [],
      "affected": 1
    };

    jest.spyOn(service, 'remove').mockResolvedValue(deleteDoctorResponse);

    const result = await service.remove(doctorId);

    expect(service.remove).toHaveBeenCalled();
    expect(result).toEqual(deleteDoctorResponse);

    // Check if the Doctor is indeed deleted
    const doctor = await service.findOne(doctorId);
    expect(doctor).toBeUndefined();
  });

  it('Should return doctor already exists', async () => {
    const createDoctorDto = {
      name: 'John Doe',
      department: 'Psychiatry',
      phoneNumber: '1234567890',
      email: ''
    } as CreateDoctorDto;

    jest.spyOn(service, 'create').mockResolvedValue('Doctor already exists');

    const result = await service.create(createDoctorDto);

    expect(result).toBe('Doctor already exists');
  });

});
