import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { AccessController } from './access.controller.js';
import { AccessService } from './access.service.js';
import { MailModule } from '../mail/mail.module.js'; // <-- Importamos el MailModule

@Module({
  imports: [AuthModule, MailModule], // <-- Lo agregamos a los imports
  controllers: [AccessController],
  providers: [AccessService],
})
export class AccessModule {}