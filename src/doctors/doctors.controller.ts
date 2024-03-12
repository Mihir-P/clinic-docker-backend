import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, InternalServerErrorException, Put } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctor')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  async create(@Body() createDoctorDto: CreateDoctorDto) {
    const res = await this.doctorsService.create(createDoctorDto);
    if(res === 'Doctor already exists') throw new BadRequestException('Doctor with same phonennumber already exists');
    else if(res instanceof Error) throw new InternalServerErrorException('Something went wrong');
    return res;
  }

  @Get()
  async findAll() {
    return await this.doctorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.doctorsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    const updateDoctor = await this.doctorsService.update(id, updateDoctorDto);
    if(!updateDoctor) throw new BadRequestException('Doctor not found')
    return updateDoctor;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.doctorsService.remove(id);
  }
}
