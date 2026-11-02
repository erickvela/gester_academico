import type { Request } from 'express';

export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT';

export interface AuthenticatedUser {
  sub: string;
  email: string;
  role: UserRole;
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}
