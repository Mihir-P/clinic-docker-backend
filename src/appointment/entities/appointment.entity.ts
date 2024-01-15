import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

@Entity('appointment_slots')
export class Slot {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    slug: string;

    @Column()
    displayName: string;

    @Column({ type: 'time' })
    startTime: String;

    @Column({ type: 'time' })
    endTime: String;

    @OneToMany(() => DoctorAvailability, (availability) => availability.slot, {nullable: true})
    availabilities: DoctorAvailability[];

    @OneToMany(() => Appointment, (appointment) => appointment.slot, {nullable: true})
    appointments: Appointment[];

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

}

@Entity('appointments')
export class Appointment {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'date' })
    appointmentDate: Date;

    @ManyToOne(() => Patient, (patient) => patient.appointments)
    @JoinColumn()
    patient: Patient;

    @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
    @JoinColumn()
    doctor: Doctor;

    @ManyToOne(() => Slot, (slot) => slot.appointments)
    @JoinColumn()
    slot: Slot;

    @Column({default: false})
    isCanceled: boolean;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
    
}

@Entity('doctor_availabilities')
export class DoctorAvailability {
    @PrimaryColumn()
    id: string;

    @ManyToOne(() => Doctor, (doctor) => doctor.availabilities)
    @JoinColumn()
    doctor: Doctor;

    @Column({ type: 'date' })
    date: Date;

    @ManyToOne(() => Slot, (slot) => slot.availabilities)
    @JoinColumn()
    slot: Slot;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
    
}