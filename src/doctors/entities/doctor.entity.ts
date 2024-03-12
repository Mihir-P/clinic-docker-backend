import { Appointment, DoctorAvailability } from '../../appointment/entities/appointment.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity('doctors')
export class Doctor {
    @PrimaryColumn()
    id : string;

    @Column()
    name : string;

    @Column({nullable: true})
    department : string;

    @Column({unique: true})
    phoneNumber : string;

    @Column({unique: true})
    email : string;

    @Column()
    createdAt : Date;

    @Column()
    updatedAt : Date;

    @OneToMany(() => Appointment, (appointment) => appointment.doctor)
    appointments: Appointment[];

    @OneToMany(() => DoctorAvailability, (availability) => availability.doctor)
    availabilities: DoctorAvailability[];
}
