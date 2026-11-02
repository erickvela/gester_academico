export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT';

export interface SessionUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface LoginResponse {
  accessToken: string;
  user: SessionUser;
}

export interface Student {
  id: string;
  code: string;
  firstName: string;
  lastName: string;
  email: string;
  status: 'ACTIVE' | 'INACTIVE' | 'GRADUATED';
}

export interface Course {
  id: string;
  code: string;
  name: string;
  description: string | null;
  credits: number;
  teacherId: string;
  isActive: boolean;
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  title: string;
  score: number;
  maxScore: number;
  percentage: number;
  createdAt: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  createdAt: string;
}

export interface AccessUser extends SessionUser {
  isActive: boolean;
  createdAt: string;
}

export interface Overview {
  activeStudents: number;
  activeCourses: number;
  gradeRecords: number;
  enrollments: number;
  averageScore: number | null;
}

export interface CourseReport extends Pick<Course, 'id' | 'code' | 'name' | 'isActive'> {
  averageScore: number | null;
  gradeCount: number;
}
