// este archivo define el modulo de correo electronico en la aplicacion
import { Module } from '@nestjs/common';
import { MailService } from './mail.service.js';

@Module({
  providers: [MailService],
  exports: [MailService], // Esto permite que otros módulos usen el servicio
})
export class MailModule {}