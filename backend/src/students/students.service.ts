import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuditService } from '../common/audit.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateStudentDto, UpdateStudentDto } from './dto/student.dto.js';

@Injectable()
export class StudentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  list(offset?: string, limit?: string) {
    return this.prisma.db.orm.public.Student
      .orderBy((student) => student.createdAt.desc())
      .limit(this.pageSize(limit))
      .offset(this.pageOffset(offset))
      .all();
  }

  async create(input: CreateStudentDto, actorId: string, ip?: string) {
    const code = input.code.trim().toUpperCase();
    const email = input.email.trim().toLowerCase();
    const existing = await this.prisma.db.orm.public.Student
      .where({ code })
      .first();
    const existingEmail = await this.prisma.db.orm.public.Student
      .where({ email })
      .first();
    if (existing || existingEmail) {
      throw new ConflictException('El carné o el correo ya están registrados.');
    }

    const student = await this.prisma.db.orm.public.Student.create({
      code,
      email,
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
    });
    await this.audit.record(actorId, 'student.created', ip);
    return student;
  }

  async update(id: string, input: UpdateStudentDto, actorId: string, ip?: string) {
    const student = await this.prisma.db.orm.public.Student.where({ id }).first();
    if (!student) {
      throw new NotFoundException('No se encontró el alumno.');
    }

    const email = input.email?.trim().toLowerCase();
    if (email && email !== student.email) {
      const duplicate = await this.prisma.db.orm.public.Student.where({ email }).first();
      if (duplicate) {
        throw new ConflictException('Ya existe un alumno con ese correo.');
      }
    }

    const updated = await this.prisma.db.orm.public.Student.where({ id }).update({
      ...(input.firstName !== undefined && { firstName: input.firstName.trim() }),
      ...(input.lastName !== undefined && { lastName: input.lastName.trim() }),
      ...(email !== undefined && { email }),
      ...(input.status !== undefined && { status: input.status }),
    });
    await this.audit.record(actorId, 'student.updated', ip);
    return updated;
  }

  private pageSize(value?: string): number {
    return this.validPageNumber(value, 50, 100);
  }

  private pageOffset(value?: string): number {
    return this.validPageNumber(value, 0, 1_000_000);
  }

  private validPageNumber(value: string | undefined, fallback: number, max: number): number {
    if (value === undefined) {
      return fallback;
    }
    const parsed = Number(value);
    if (!Number.isInteger(parsed) || parsed < 0 || parsed > max) {
      throw new BadRequestException('El parámetro de paginación no es válido.');
    }
    return parsed;
  }
}
