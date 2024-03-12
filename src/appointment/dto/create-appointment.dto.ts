import { Patient } from '../../patient/entities/patient.entity';
import { Slot } from '../../appointment/entities/appointment.entity';

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
