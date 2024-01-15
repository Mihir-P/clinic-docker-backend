import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
    name : string;
    dateOfBirth : Date;
    phoneNumber : string;
    email : string;
    updatedAt : Date;
}
