import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientService {
  
  constructor(@InjectRepository(Patient)
    private patientRepository: Repository<Patient>
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const patient = new Patient();
    patient.id = uuid();
    patient.name = createPatientDto.name;
    patient.dateOfBirth = createPatientDto.dateOfBirth;
    patient.phoneNumber = createPatientDto.phoneNumber;
    patient.email = createPatientDto.email;
    patient.createdAt = new Date();
    patient.updatedAt = new Date();
    try {
      return await this.patientRepository.save(patient);
    } catch (error) {
      console.log(error);
      if(error.toString().startsWith('QueryFailedError: duplicate key value violates unique constraint')) {
        return 'Patient already exists';
      }
      return error;
    }
    
  }

  async findAll() {
    const allPatients = await this.patientRepository.find();
    return allPatients;
  }

  async findOne(id: string) {
    const patient = await this.patientRepository.findOne({where: {id: id}});
    return patient;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    const patientToUpdate = await this.patientRepository.findOne({where: {id: id}});
    if(!patientToUpdate) return;
    patientToUpdate.name = updatePatientDto.name;
    patientToUpdate.dateOfBirth = updatePatientDto.dateOfBirth;
    patientToUpdate.phoneNumber = updatePatientDto.phoneNumber;
    patientToUpdate.email = updatePatientDto.email;
    patientToUpdate.updatedAt = new Date();
    return this.patientRepository.save(patientToUpdate);
  }

  async remove(id: string) {
    return await this.patientRepository.delete(id);
  }

}
