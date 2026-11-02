import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, of, type Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ApiService } from '../../core/api.service';
import { AuthService } from '../../core/auth.service';
import type {
  AccessUser,
  Course,
  CourseReport,
  Enrollment,
  Grade,
  Overview,
  Student,
} from '../../core/models';

type Section = 'overview' | 'courses' | 'students' | 'grades' | 'reports' | 'access';

@Component({
  selector: 'app-portal-section',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './portal-section.page.html',
  styleUrl: './portal-section.page.scss',
})
export class PortalSectionPage {
  private readonly formBuilder = inject(FormBuilder);
  readonly section = signal<Section>('overview');
  readonly sectionTitle = computed(() => ({
    overview: 'Resumen académico',
    courses: 'Cursos',
    students: 'Alumnos',
    grades: 'Punteos e inscripciones',
    reports: 'Reportes',
    access: 'Administración de accesos',
  })[this.section()]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly errorMessage = signal('');
  readonly notice = signal('');
  readonly overview = signal<Overview | null>(null);
  readonly courses = signal<Course[]>([]);
  readonly students = signal<Student[]>([]);
  readonly grades = signal<Grade[]>([]);
  readonly enrollments = signal<Enrollment[]>([]);
  readonly users = signal<AccessUser[]>([]);
  readonly courseReports = signal<CourseReport[]>([]);
  readonly selectedCourseId = signal('');
  readonly teachers = computed(() => this.users().filter((user) => user.role === 'TEACHER' && user.isActive));
  readonly studentNames = computed(() => new Map(
    this.students().map((student) => [student.id, `${student.firstName} ${student.lastName}`]),
  ));

  readonly studentForm = this.formBuilder.nonNullable.group({
    code: ['', [Validators.required, Validators.maxLength(30)]],
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email]],
  });
  readonly courseForm = this.formBuilder.nonNullable.group({
    code: ['', [Validators.required, Validators.maxLength(20)]],
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
    description: ['', Validators.maxLength(1000)],
    credits: [3, [Validators.required, Validators.min(1), Validators.max(20)]],
    teacherId: [''],
  });
  readonly enrollmentForm = this.formBuilder.nonNullable.group({
    studentId: ['', Validators.required],
  });
  readonly gradeForm = this.formBuilder.nonNullable.group({
    studentId: ['', Validators.required],
    title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    score: [0, [Validators.required, Validators.min(0)]],
    maxScore: [100, [Validators.required, Validators.min(1)]],
    percentage: [100, [Validators.required, Validators.min(0), Validators.max(100)]],
  });
  readonly accessForm = this.formBuilder.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email]],
    role: ['TEACHER' as 'ADMIN' | 'TEACHER', Validators.required],
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly api: ApiService,
    readonly auth: AuthService,
  ) {
    this.route.data.pipe(takeUntilDestroyed()).subscribe((data) => {
      this.section.set(data['section'] as Section);
      this.clearFeedback();
      this.loadSection();
    });
  }

  onCourseSelection(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLSelectElement) {
      this.selectCourse(target.value);
    }
  }

  private loadSection(): void {
    switch (this.section()) {
      case 'overview':
        this.run(this.api.overview(), (result) => this.overview.set(result));
        break;
      case 'courses':
        this.loadCourseList();
        break;
      case 'students':
        this.run(this.api.students(), (result) => this.students.set(result));
        break;
      case 'grades':
        this.run(
          forkJoin({ courses: this.api.courses(), students: this.api.students() }),
          (result) => {
            this.courses.set(result.courses);
            this.students.set(result.students);
            if (this.selectedCourseId()) {
              this.loadCourseRecords(this.selectedCourseId());
            }
          },
        );
        break;
      case 'reports':
        this.run(this.api.courseReports(), (result) => this.courseReports.set(result));
        break;
      case 'access':
        this.run(this.api.users(), (result) => this.users.set(result));
        break;
    }
  }

  private loadCourseList(): void {
    const request = this.auth.user()?.role === 'ADMIN'
      ? forkJoin({ courses: this.api.courses(), users: this.api.users() })
      : forkJoin({ courses: this.api.courses(), users: of([] as AccessUser[]) });
    this.run(request, (result) => {
      this.courses.set(result.courses);
      this.users.set(result.users);
    });
  }

  selectCourse(courseId: string): void {
    this.selectedCourseId.set(courseId);
    this.enrollmentForm.reset({ studentId: '' });
    this.gradeForm.reset({ studentId: '', title: '', score: 0, maxScore: 100, percentage: 100 });
    if (courseId) {
      this.loadCourseRecords(courseId);
    } else {
      this.grades.set([]);
      this.enrollments.set([]);
    }
  }

  private loadCourseRecords(courseId: string): void {
    this.run(
      forkJoin({
        grades: this.api.courseGrades(courseId),
        enrollments: this.api.courseEnrollments(courseId),
      }),
      (result) => {
        this.grades.set(result.grades);
        this.enrollments.set(result.enrollments);
      },
    );
  }

  createStudent(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }
    this.save(
      this.api.createStudent(this.studentForm.getRawValue()),
      (student) => {
        this.studentForm.reset({ code: '', firstName: '', lastName: '', email: '' });
        this.students.update((rows) => [student, ...rows]);
        this.notice.set('Alumno registrado.');
      },
    );
  }

  createCourse(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }
    const values = this.courseForm.getRawValue();
    const input = {
      code: values.code,
      name: values.name,
      description: values.description,
      credits: values.credits,
      ...(this.auth.user()?.role === 'ADMIN' && values.teacherId
        ? { teacherId: values.teacherId }
        : {}),
    };
    this.save(
      this.api.createCourse(input),
      (course) => {
        this.courseForm.reset({ code: '', name: '', description: '', credits: 3, teacherId: '' });
        this.courses.update((rows) => [course, ...rows]);
        this.notice.set('Curso registrado.');
      },
    );
  }

  createEnrollment(): void {
    const studentId = this.enrollmentForm.controls.studentId.value;
    const courseId = this.selectedCourseId();
    if (!courseId || this.enrollmentForm.invalid) {
      this.enrollmentForm.markAllAsTouched();
      return;
    }
    this.save(
      this.api.enroll(studentId, courseId),
      () => {
        this.enrollmentForm.reset({ studentId: '' });
        this.notice.set('Alumno inscrito en el curso.');
        this.loadCourseRecords(courseId);
      },
    );
  }

  createGrade(): void {
    const courseId = this.selectedCourseId();
    if (!courseId || this.gradeForm.invalid) {
      this.gradeForm.markAllAsTouched();
      return;
    }
    const values = this.gradeForm.getRawValue();
    if (values.score > values.maxScore) {
      this.errorMessage.set('El punteo no puede superar el valor máximo.');
      return;
    }
    this.save(
      this.api.createGrade({ ...values, courseId }),
      () => {
        this.gradeForm.reset({ studentId: '', title: '', score: 0, maxScore: 100, percentage: 100 });
        this.notice.set('Punteo registrado.');
        this.loadCourseRecords(courseId);
      },
    );
  }

 createAccessUser(): void {
    if (this.accessForm.invalid) {
      this.accessForm.markAllAsTouched();
      return;
    }
    const values = this.accessForm.getRawValue();
    this.save(
      this.api.createUser({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        role: values.role,
      } as any),
      (user) => {
        this.accessForm.reset({
          firstName: '',
          lastName: '',
          email: '',
          role: 'TEACHER',
        });
        this.users.update((rows) => [user, ...rows]);
        this.notice.set('Cuenta creada. Comparte las credenciales de forma segura.');
      },
    );
  }
  
  toggleStudent(student: Student): void {
    const status = student.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    this.save(
      this.api.updateStudentStatus(student.id, status),
      (updated) => {
        this.students.update((rows) => rows.map((row) => row.id === updated.id ? updated : row));
        this.notice.set('Estado del alumno actualizado.');
      },
    );
  }

  toggleCourse(course: Course): void {
    this.save(
      this.api.updateCourseStatus(course.id, !course.isActive),
      (updated) => {
        this.courses.update((rows) => rows.map((row) => row.id === updated.id ? updated : row));
        this.notice.set('Estado del curso actualizado.');
      },
    );
  }

  toggleUser(user: AccessUser): void {
    this.save(
      this.api.updateUserStatus(user.id, !user.isActive),
      (updated) => {
        this.users.update((rows) => rows.map((row) => row.id === updated.id ? updated : row));
        this.notice.set('Estado de la cuenta actualizado.');
      },
    );
  }

  studentName(id: string): string {
    return this.studentNames().get(id) ?? 'Alumno';
  }

  courseName(id: string): string {
    return this.courses().find((course) => course.id === id)?.name ?? 'Curso';
  }

  downloadReport(): void {
    const header = ['Código', 'Curso', 'Estado', 'Promedio de punteos', 'Evaluaciones'];
    const rows = this.courseReports().map((course) => [
      course.code,
      course.name,
      course.isActive ? 'Activo' : 'Inactivo',
      course.averageScore === null ? '' : course.averageScore.toFixed(2),
      String(course.gradeCount),
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((value) => this.csvCell(value)).join(','))
      .join('\r\n');
    const blob = new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'aulabase-reporte-cursos.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  private csvCell(value: string): string {
    const safeValue = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
    return `"${safeValue.replaceAll('"', '""')}"`;
  }

  private clearFeedback(): void {
    this.errorMessage.set('');
    this.notice.set('');
  }

  private run<T>(request: Observable<T>, onSuccess: (value: T) => void): void {
    this.loading.set(true);
    this.errorMessage.set('');
    request.pipe(finalize(() => this.loading.set(false))).subscribe({
      next: onSuccess,
      error: (error: unknown) => this.errorMessage.set(this.getErrorMessage(error)),
    });
  }

  private save<T>(
    request: Observable<T>,
    onSuccess: (value: T) => void,
  ): void {
    if (this.saving()) {
      return;
    }
    this.saving.set(true);
    this.clearFeedback();
    request.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: (value) => {
        onSuccess(value);
      },
      error: (error: unknown) => this.errorMessage.set(this.getErrorMessage(error)),
    });
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse && error.status === 0) {
      return 'No se pudo conectar con la API. Revisa que el backend esté iniciado.';
    }
    if (error instanceof HttpErrorResponse) {
      const message = error.error?.message;
      if (typeof message === 'string') {
        return message;
      }
      if (Array.isArray(message)) {
        return message.join(' ');
      }
    }
    return 'Ocurrió un error al consultar la información. Inténtalo nuevamente.';
  }
}