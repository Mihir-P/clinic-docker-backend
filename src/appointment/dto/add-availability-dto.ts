import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Slot } from '../entities/appointment.entity';

export class AddAvailabilityDto {
    id: String;
    date: Date;
    slotId: number;
    doctorId: string;
    createdAt: Date;
    updatedAt: Date;
}
