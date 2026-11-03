import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcryptjs';
import { AuditService } from '../common/audit.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateUserDto } from './dto/create-user.dto.js';

@Injectable()
export class AccessService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
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

    // Si el frontend no envía password, generamos una aleatoria válida de 12 caracteres
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

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      // Retornamos la clave generada si el backend la asignó automáticamente
      temporaryPassword: input.password ? undefined : rawPassword,
    };
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