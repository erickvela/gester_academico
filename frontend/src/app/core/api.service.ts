import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import type {
  AccessUser,
  Course,
  CourseReport,
  Enrollment,
  Grade,
  Overview,
  Student,
  UserRole,
} from './models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly base = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  overview() {
    return this.http.get<Overview>(`${this.base}/reports/overview`);
  }

  courses(offset = 0, limit = 100) {
    const params = new HttpParams().set('offset', offset).set('limit', limit);
    return this.http.get<Course[]>(`${this.base}/courses`, { params });
  }

  students(offset = 0, limit = 100) {
    const params = new HttpParams().set('offset', offset).set('limit', limit);
    return this.http.get<Student[]>(`${this.base}/students`, { params });
  }

  courseGrades(courseId: string) {
    return this.http.get<Grade[]>(`${this.base}/grades`, {
      params: new HttpParams().set('courseId', courseId),
    });
  }

  courseEnrollments(courseId: string) {
    return this.http.get<Enrollment[]>(`${this.base}/enrollments`, {
      params: new HttpParams().set('courseId', courseId),
    });
  }

  courseReports() {
    return this.http.get<CourseReport[]>(`${this.base}/reports/courses`);
  }

  users() {
    return this.http.get<AccessUser[]>(`${this.base}/access/users`);
  }

  createStudent(input: Pick<Student, 'code' | 'firstName' | 'lastName' | 'email'>) {
    return this.http.post<Student>(`${this.base}/students`, input);
  }

  updateStudentStatus(id: string, status: Student['status']) {
    return this.http.patch<Student>(`${this.base}/students/${id}`, { status });
  }

  createCourse(input: {
    code: string;
    name: string;
    description: string;
    credits: number;
    teacherId?: string;
  }) {
    return this.http.post<Course>(`${this.base}/courses`, input);
  }

  updateCourseStatus(id: string, isActive: boolean) {
    return this.http.patch<Course>(`${this.base}/courses/${id}`, { isActive });
  }

  enroll(studentId: string, courseId: string) {
    return this.http.post<Enrollment>(`${this.base}/enrollments`, { studentId, courseId });
  }

  createGrade(input: {
    studentId: string;
    courseId: string;
    title: string;
    score: number;
    maxScore: number;
    percentage: number;
  }) {
    return this.http.post<Grade>(`${this.base}/grades`, input);
  }

  createUser(input: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: Exclude<UserRole, 'STUDENT'>;
  }) {
    return this.http.post<AccessUser>(`${this.base}/access/users`, input);
  }

  updateUserStatus(id: string, isActive: boolean) {
    return this.http.patch<AccessUser>(`${this.base}/access/users/${id}/status`, { isActive });
  }
}
