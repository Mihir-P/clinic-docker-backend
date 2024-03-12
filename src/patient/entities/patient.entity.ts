import { Appointment } from '../../appointment/entities/appointment.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity('patients')
export class Patient {
    @PrimaryColumn()
    id : String;

    @Column()
    name : String;

    @Column({nullable: true, type: 'date'})
    dateOfBirth : Date;

    @Column({unique: true})
    phoneNumber : String;

    @Column()
    email : String;

    @Column()
    createdAt : Date;

    @Column()
    updatedAt : Date;

    @OneToMany(() => Appointment, (appointment) => appointment.patient)
    appointments: Appointment[];
}
