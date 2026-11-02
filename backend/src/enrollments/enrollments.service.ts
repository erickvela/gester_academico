import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuditService } from '../common/audit.service.js';
import type { AuthenticatedUser } from '../common/auth.types.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateEnrollmentDto } from './dto/create-enrollment.dto.js';

@Injectable()
export class EnrollmentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  async list(courseId: string, actor: AuthenticatedUser) {
    if (!courseId) {
      throw new BadRequestException('Indica el curso que quieres consultar.');
    }
    await this.ensureCourseAccess(courseId, actor);
    return this.prisma.db.orm.public.Enrollment
      .where({ courseId })
      .orderBy((enrollment) => enrollment.createdAt.desc())
      .limit(500)
      .all();
  }

  async create(input: CreateEnrollmentDto, actor: AuthenticatedUser, ip?: string) {
    const course = await this.ensureCourseAccess(input.courseId, actor);
    if (!course.isActive) {
      throw new ConflictException('No se puede inscribir en un curso inactivo.');
    }
    const student = await this.prisma.db.orm.public.Student.where({ id: input.studentId }).first();
    if (!student || student.status !== 'ACTIVE') {
      throw new NotFoundException('No se encontró un alumno activo.');
    }

    const duplicate = await this.prisma.db.orm.public.Enrollment
      .where({ studentId: input.studentId, courseId: input.courseId })
      .first();
    if (duplicate) {
      throw new ConflictException('El alumno ya está inscrito en este curso.');
    }

    const enrollment = await this.prisma.db.orm.public.Enrollment.create({
      studentId: input.studentId,
      courseId: input.courseId,
    });
    await this.audit.record(actor.sub, 'enrollment.created', ip);
    return enrollment;
  }

  private async ensureCourseAccess(courseId: string, actor: AuthenticatedUser) {
    const course = await this.prisma.db.orm.public.Course.where({ id: courseId }).first();
    if (!course || (actor.role === 'TEACHER' && course.teacherId !== actor.sub)) {
      throw new NotFoundException('No se encontró el curso.');
    }
    return course;
  }
}
