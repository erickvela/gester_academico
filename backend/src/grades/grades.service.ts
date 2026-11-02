import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuditService } from '../common/audit.service.js';
import type { AuthenticatedUser } from '../common/auth.types.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { isGradeWithinMaximum } from './grade-score.js';
import type { CreateGradeDto, UpdateGradeDto } from './dto/grade.dto.js';

@Injectable()
export class GradesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  async list(courseId: string, actor: AuthenticatedUser) {
    if (!courseId) {
      throw new BadRequestException('Indica el curso que quieres consultar.');
    }
    await this.ensureCourseAccess(courseId, actor);
    return this.prisma.db.orm.public.Grade
      .where({ courseId })
      .orderBy((grade) => grade.createdAt.desc())
      .limit(500)
      .all();
  }

  async create(input: CreateGradeDto, actor: AuthenticatedUser, ip?: string) {
    await this.ensureCourseAccess(input.courseId, actor);
    this.validateScore(input.score, input.maxScore);
    const student = await this.prisma.db.orm.public.Student.where({ id: input.studentId }).first();
    if (!student) {
      throw new NotFoundException('No se encontró el alumno.');
    }
    const enrollment = await this.prisma.db.orm.public.Enrollment
      .where({ studentId: input.studentId, courseId: input.courseId })
      .first();
    if (!enrollment) {
      throw new BadRequestException('El alumno debe estar inscrito en el curso antes de recibir calificaciones.');
    }

    const grade = await this.prisma.db.orm.public.Grade.create({
      studentId: input.studentId,
      courseId: input.courseId,
      title: input.title.trim(),
      score: input.score,
      maxScore: input.maxScore,
      percentage: input.percentage,
    });
    await this.audit.record(actor.sub, 'grade.created', ip);
    return grade;
  }

  async update(id: string, input: UpdateGradeDto, actor: AuthenticatedUser, ip?: string) {
    const existing = await this.prisma.db.orm.public.Grade.where({ id }).first();
    if (!existing) {
      throw new NotFoundException('No se encontró la calificación.');
    }
    await this.ensureCourseAccess(existing.courseId, actor);

    const score = input.score ?? existing.score;
    const maxScore = input.maxScore ?? existing.maxScore;
    this.validateScore(score, maxScore);

    const grade = await this.prisma.db.orm.public.Grade.where({ id }).update({
      ...(input.title !== undefined && { title: input.title.trim() }),
      ...(input.score !== undefined && { score: input.score }),
      ...(input.maxScore !== undefined && { maxScore: input.maxScore }),
      ...(input.percentage !== undefined && { percentage: input.percentage }),
    });
    await this.audit.record(actor.sub, 'grade.updated', ip);
    return grade;
  }

  private validateScore(score: number, maxScore: number): void {
    if (!isGradeWithinMaximum(score, maxScore)) {
      throw new BadRequestException('El punteo no puede superar el valor máximo.');
    }
  }

  private async ensureCourseAccess(courseId: string, actor: AuthenticatedUser) {
    const course = await this.prisma.db.orm.public.Course.where({ id: courseId }).first();
    if (!course || (actor.role === 'TEACHER' && course.teacherId !== actor.sub)) {
      throw new NotFoundException('No se encontró el curso.');
    }
    return course;
  }
}
