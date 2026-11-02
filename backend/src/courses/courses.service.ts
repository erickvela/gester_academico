import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuditService } from '../common/audit.service.js';
import type { AuthenticatedUser } from '../common/auth.types.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateCourseDto, UpdateCourseDto } from './dto/course.dto.js';

@Injectable()
export class CoursesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  list(user: AuthenticatedUser, offset?: string, limit?: string) {
    const pageSize = this.pageNumber(limit, 50, 100);
    const pageOffset = this.pageNumber(offset, 0, 1_000_000);
    const courses = this.prisma.db.orm.public.Course
      .orderBy((course) => course.createdAt.desc())
      .limit(pageSize)
      .offset(pageOffset);

    return user.role === 'TEACHER'
      ? courses.where({ teacherId: user.sub }).all()
      : courses.all();
  }

  async create(input: CreateCourseDto, actor: AuthenticatedUser, ip?: string) {
    const code = input.code.trim().toUpperCase();
    const existing = await this.prisma.db.orm.public.Course.where({ code }).first();
    if (existing) {
      throw new ConflictException('Ya existe un curso con ese código.');
    }

    const teacherId = actor.role === 'TEACHER' ? actor.sub : input.teacherId;
    if (!teacherId) {
      throw new BadRequestException('Selecciona el docente responsable del curso.');
    }
    await this.ensureTeacher(teacherId);

    const course = await this.prisma.db.orm.public.Course.create({
      code,
      name: input.name.trim(),
      description: input.description?.trim() || null,
      credits: input.credits,
      teacherId,
    });
    await this.audit.record(actor.sub, 'course.created', ip);
    return course;
  }

  async update(id: string, input: UpdateCourseDto, actor: AuthenticatedUser, ip?: string) {
    const existing = await this.prisma.db.orm.public.Course.where({ id }).first();
    if (!existing) {
      throw new NotFoundException('No se encontró el curso.');
    }
    if (actor.role === 'TEACHER' && existing.teacherId !== actor.sub) {
      throw new NotFoundException('No se encontró el curso.');
    }
    if (input.teacherId) {
      if (actor.role !== 'ADMIN') {
        throw new BadRequestException('Solo administración puede reasignar docentes.');
      }
      await this.ensureTeacher(input.teacherId);
    }

    const course = await this.prisma.db.orm.public.Course.where({ id }).update({
      ...(input.name !== undefined && { name: input.name.trim() }),
      ...(input.description !== undefined && { description: input.description.trim() || null }),
      ...(input.credits !== undefined && { credits: input.credits }),
      ...(input.isActive !== undefined && { isActive: input.isActive }),
      ...(input.teacherId !== undefined && { teacherId: input.teacherId }),
    });
    await this.audit.record(actor.sub, 'course.updated', ip);
    return course;
  }

  private async ensureTeacher(id: string): Promise<void> {
    const teacher = await this.prisma.db.orm.public.User.where({ id }).first();
    if (!teacher || teacher.role !== 'TEACHER' || !teacher.isActive) {
      throw new BadRequestException('El docente seleccionado no está activo.');
    }
  }

  private pageNumber(value: string | undefined, fallback: number, max: number): number {
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
