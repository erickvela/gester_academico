import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
import type { LoginResponse, SessionUser } from './models';

const TOKEN_KEY = 'aulabase.access-token';
const USER_KEY = 'aulabase.session-user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userState = signal<SessionUser | null>(this.readUser());
  readonly user = this.userState.asReadonly();
  readonly isAuthenticated = computed(() => this.userState() !== null);

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {}

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap((session) => {
          sessionStorage.setItem(TOKEN_KEY, session.accessToken);
          sessionStorage.setItem(USER_KEY, JSON.stringify(session.user));
          this.userState.set(session.user);
        }),
      );
  }

  logout(): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    this.userState.set(null);
    void this.router.navigateByUrl('/');
  }

  private readUser(): SessionUser | null {
    if (typeof sessionStorage === 'undefined') {
      return null;
    }

    const token = sessionStorage.getItem(TOKEN_KEY);
    const storedUser = sessionStorage.getItem(USER_KEY);
    if (!token || !storedUser) {
      return null;
    }

    try {
      const user = JSON.parse(storedUser) as SessionUser;
      if (
        typeof user.id === 'string' &&
        typeof user.email === 'string' &&
        typeof user.firstName === 'string' &&
        typeof user.lastName === 'string' &&
        ['ADMIN', 'TEACHER', 'STUDENT'].includes(user.role)
      ) {
        return user;
      }
    } catch {
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(USER_KEY);
    }

    return null;
  }
}
