import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('default')
export class AppController {
  constructor(private readonly appService: AppService) {}
}
