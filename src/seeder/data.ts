import { Slot } from "src/appointment/entities/appointment.entity";

export const slots : Slot[] = [
    {id: 1, slug: 'first', displayName: 'Morning', startTime: '09:00:00', endTime: '11:00:00', appointments: null, availabilities:  null, createdAt: new Date(), updatedAt: new Date()},
    {id: 2, slug: 'second', displayName: 'Morning - II', startTime: '11:00:00', endTime: '13:00:00', appointments: null, availabilities:  null, createdAt: new Date(), updatedAt: new Date()},
    {id: 3, slug: 'third', displayName: 'Afternoon', startTime: '14:00:00', endTime: '16:00:00', appointments: null, availabilities:  null, createdAt: new Date(), updatedAt: new Date()},
    {id: 4, slug: 'fourth', displayName: 'Afternoon - II', startTime: '16:00:00', endTime: '18:00:00', appointments: null, availabilities:  null, createdAt: new Date(), updatedAt: new Date()},
    {id: 5, slug: 'fifth', displayName: 'Evening', startTime: '18:00:00', endTime: '19:00:00', appointments: null, availabilities:  null, createdAt: new Date(), updatedAt: new Date()},
]