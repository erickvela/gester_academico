import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcryptjs';
import { AuditService } from '../common/audit.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { MailService } from '../mail/mail.service.js';
import type { CreateUserDto } from './dto/create-user.dto.js';

@Injectable()
export class AccessService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
    private readonly mailService: MailService,
  ) {}

  list() {
    return this.prisma.db.orm.public.User
      .select('id', 'email', 'firstName', 'lastName', 'role', 'isActive', 'createdAt')
      .orderBy((user) => user.createdAt.desc())
      .limit(100)
      .all();
  }

  private generateRandomPassword(length = 12): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let rawPassword = '';
    for (let i = 0; i < length; i++) {
      rawPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return rawPassword;
  }

  async create(input: CreateUserDto, actorId: string, ip?: string) {
    const email = input.email.trim().toLowerCase();
    const existing = await this.prisma.db.orm.public.User.where({ email }).first();
    if (existing) {
      throw new ConflictException('Ya existe una cuenta con ese correo.');
    }

    const rawPassword = input.password || this.generateRandomPassword(12);

    const password = await hash(rawPassword, 12);
    const user = await this.prisma.db.orm.public.User.create({
      email,
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      password,
      role: input.role,
    });
    await this.audit.record(actorId, 'access.user.created', ip);

    // Disparar el envío de correo automático en segundo plano
    this.mailService.sendTeacherCredentials(user.email, rawPassword)
      .then(() => {
        console.log(`Correo de credenciales enviado con éxito a: ${user.email}`);
      })
      .catch((error) => {
        console.error('Error al intentar enviar el correo de credenciales:', error);
      });

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      temporaryPassword: input.password ? undefined : rawPassword,
    };
  }

  async resetPassword(email: string) {
    // 1. Buscar si el usuario existe usando la estructura de tu proyecto
    const user = await this.prisma.db.orm.public.User.where({ email }).first();
    if (!user) {
      // Por seguridad, se retorna un mensaje genérico para evitar que adivinen correos
      return { message: 'Si el correo existe, se enviaron las instrucciones.' };
    }

    // 2. Generar una nueva contraseña  aleatoria
    const newTempPassword = this.generateRandomPassword(12);
    const hashedPassword = await hash(newTempPassword, 12);

    // 3. Guardar la nueva contraseña en la base de datos
    await this.prisma.db.orm.public.User
      .where({ email })
      .update({ password: hashedPassword });

    // 4. Enviar el correo usando el servicio de Mailservice
    await this.mailService.sendTeacherCredentials(email, newTempPassword);

    return { message: 'Correo de recuperación enviado exitosamente.' };
  }

  async updateStatus(id: string, isActive: boolean, actorId: string, ip?: string) {
    const user = await this.prisma.db.orm.public.User.where({ id }).first();
    if (!user) {
      throw new NotFoundException('No se encontró la cuenta.');
    }
    if (id === actorId && !isActive) {
      throw new ConflictException('No puedes desactivar tu propia cuenta.');
    }

    const updated = await this.prisma.db.orm.public.User
      .where({ id })
      .update({ isActive });
    if (!updated) {
      throw new NotFoundException('No se encontró la cuenta.');
    }
    await this.audit.record(actorId, 'access.user.status.updated', ip);

    return {
      id: updated.id,
      email: updated.email,
      firstName: updated.firstName,
      lastName: updated.lastName,
      role: updated.role,
      isActive: updated.isActive,
    };
  }
}