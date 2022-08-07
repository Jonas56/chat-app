import { Controller } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller()
export class AppController {
  constructor(private readonly appService: ChatService) {}
}
