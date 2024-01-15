import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slot } from './entities/appointment.entity';
import { slots } from 'src/seeder/data';

@Injectable()
export class SlotSeederService {
  constructor(
    @InjectRepository(Slot)
    private readonly slotRepository: Repository<Slot>,
  ) {}
  
  create(): Array<Promise<Slot>> {
    return slots.map(async (slot: Slot) => {
        return await this.slotRepository
            .findOne({ where: { id: slot.id } })
            .then(async dbSlot => {
                // We check if a slot already exists.
                // If it does don't create a new one.
                if (dbSlot) {
                    return Promise.resolve(null);
                }
                return Promise.resolve(await this.slotRepository.save(slot));
            })
            .catch(error => Promise.reject(error));
    });
  }
}