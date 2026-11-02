import { Injectable } from '@nestjs/common';
import type { AuthenticatedUser } from '../common/auth.types.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async overview(actor: AuthenticatedUser) {
    if (actor.role === 'TEACHER') {
      const courses = await this.prisma.db.orm.public.Course
        .where({ teacherId: actor.sub })
        .select('id')
        .all();
      const courseIds = courses.map((course) => course.id);
      if (!courseIds.length) {
        return {
          activeStudents: 0,
          activeCourses: 0,
          gradeRecords: 0,
          enrollments: 0,
          averageScore: null,
        };
      }

      const [activeCourses, grades, enrollments, enrolledStudents] = await Promise.all([
        this.prisma.db.orm.public.Course
          .where({ teacherId: actor.sub, isActive: true })
          .aggregate((aggregate) => ({ total: aggregate.count() })),
        this.prisma.db.orm.public.Grade
          .where((grade) => grade.courseId.in(courseIds))
          .aggregate((aggregate) => ({
            total: aggregate.count(),
            average: aggregate.avg('score'),
          })),
        this.prisma.db.orm.public.Enrollment
          .where((enrollment) => enrollment.courseId.in(courseIds))
          .aggregate((aggregate) => ({ total: aggregate.count() })),
        this.prisma.db.orm.public.Enrollment
          .where((enrollment) => enrollment.courseId.in(courseIds))
          .groupBy('studentId')
          .aggregate((aggregate) => ({ total: aggregate.count() })),
      ]);
      const studentIds = enrolledStudents.map((entry) => entry.studentId);
      const activeStudents = studentIds.length
        ? await this.prisma.db.orm.public.Student
            .where((student) => student.id.in(studentIds))
            .where({ status: 'ACTIVE' })
            .aggregate((aggregate) => ({ total: aggregate.count() }))
        : { total: 0 };

      return {
        activeStudents: activeStudents.total,
        activeCourses: activeCourses.total,
        gradeRecords: grades.total,
        enrollments: enrollments.total,
        averageScore: grades.average,
      };
    }

    const [students, courses, grades, enrollments, average] = await Promise.all([
      this.prisma.db.orm.public.Student
        .where({ status: 'ACTIVE' })
        .aggregate((aggregate) => ({
        total: aggregate.count(),
        })),
      this.prisma.db.orm.public.Course
        .where({ isActive: true })
        .aggregate((aggregate) => ({ total: aggregate.count() })),
      this.prisma.db.orm.public.Grade.aggregate((aggregate) => ({
        total: aggregate.count(),
      })),
      this.prisma.db.orm.public.Enrollment.aggregate((aggregate) => ({
        total: aggregate.count(),
      })),
      this.prisma.db.orm.public.Grade.aggregate((aggregate) => ({
        average: aggregate.avg('score'),
      })),
    ]);

    return {
      activeStudents: students.total,
      activeCourses: courses.total,
      gradeRecords: grades.total,
      enrollments: enrollments.total,
      averageScore: average.average,
    };
  }

  async coursePerformance(actor: AuthenticatedUser) {
    const courseCollection = this.prisma.db.orm.public.Course
      .select('id', 'code', 'name', 'isActive')
      .orderBy((course) => course.code.asc())
      .limit(500);
    const courses = actor.role === 'TEACHER'
      ? await courseCollection.where({ teacherId: actor.sub }).all()
      : await courseCollection.all();
    const courseIds = courses.map((course) => course.id);
    if (!courseIds.length) {
      return [];
    }

    const totals = await this.prisma.db.orm.public.Grade
      .where((grade) => grade.courseId.in(courseIds))
      .groupBy('courseId')
      .aggregate((aggregate) => ({
        averageScore: aggregate.avg('score'),
        gradeCount: aggregate.count(),
      }));

    const totalsByCourse = new Map(totals.map((entry) => [entry.courseId, entry]));
    return courses.map((course) => ({
      ...course,
      averageScore: totalsByCourse.get(course.id)?.averageScore ?? null,
      gradeCount: totalsByCourse.get(course.id)?.gradeCount ?? 0,
    }));
  }
}
