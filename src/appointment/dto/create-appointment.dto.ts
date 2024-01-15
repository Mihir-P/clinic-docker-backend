import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Slot } from '../entities/appointment.entity';

export class CreateAppointmentDto {
    id: String;
    appointmentDate: Date;
    requestedSlot: Slot;
    patientId: string;
    doctorId: string;
    isCanceled: boolean;
    createdAt: Date;
    updatedAt: Date;
}
