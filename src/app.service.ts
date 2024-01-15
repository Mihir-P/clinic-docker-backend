import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { SlotSeederService } from './appointment/slot.seeder';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly slotSeederService: SlotSeederService) {
  }

  async onApplicationBootstrap() {
    this.slotSeederService.create();
  }
}