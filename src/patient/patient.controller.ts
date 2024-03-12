import { Controller, Get, Post, Body, Patch, Param, Delete, Put, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Header } from '@nestjs/common';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @Header('Cache-Control', 'none')
  async create(@Body() createPatientDto: CreatePatientDto) {
    const res = await this.patientService.create(createPatientDto);
    if(res === 'Patient already exists') throw new BadRequestException('Patient with same phonennumber already exists');
    else if(res instanceof Error) throw new InternalServerErrorException('Something went wrong');
    return res;
  }

  @Get()
  async findAll() {
    return await this.patientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.patientService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    const updatePatient = await this.patientService.update(id, updatePatientDto);
    if(!updatePatient) throw new BadRequestException('Patient not found')
    return updatePatient
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.patientService.remove(id);
  }
}
