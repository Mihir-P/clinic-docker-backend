import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from './create-appointment.dto';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Slot } from '../entities/appointment.entity';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
    appointmentDate: Date;
    doctorId: string;
    requestedSlot: Slot;
    isCanceled: boolean;
    updatedAt: Date;
}
