import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  private readonly formBuilder = inject(FormBuilder);
  readonly loading = signal(false);
  readonly errorMessage = signal('');

  passwordVisible = false;
  isResetMode = false;
  resetEmail = '';
  readonly resetLoading = signal(false);

  readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  submit(): void {
    if (this.form.invalid || this.loading()) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage.set('');
    this.loading.set(true);
    const { email, password } = this.form.getRawValue();
    this.auth.login(email, password).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        void this.router.navigateByUrl(returnUrl?.startsWith('/app') ? returnUrl : '/app');
      },
      error: (error: unknown) => {
        this.loading.set(false);
        this.errorMessage.set(this.getErrorMessage(error));
      },
      complete: () => this.loading.set(false),
    });
  }

  // Funciones para la recuperación de contraseña
  toggleResetMode(): void {
    this.isResetMode = !this.isResetMode;
    this.resetEmail = '';
    this.errorMessage.set('');
  }

  submitReset(): void {
    if (!this.resetEmail || !this.resetEmail.includes('@')) {
      alert('Por favor ingresa un correo electrónico válido.');
      return;
    }

    this.resetLoading.set(true);
    this.errorMessage.set('');

    // Llamada al servicio de autenticación para solicitar la recuperación
    this.auth.resetPassword(this.resetEmail).subscribe({
      next: (res: any) => {
        alert(res?.message || 'Se han enviado las instrucciones de recuperación a tu correo.');
        this.resetLoading.set(false);
        this.isResetMode = false;
        this.resetEmail = '';
      },
      error: (error: unknown) => {
        this.resetLoading.set(false);
        alert(this.getErrorMessage(error) || 'Ocurrió un error al procesar la solicitud.');
      },
      complete: () => this.resetLoading.set(false),
    });
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse && error.status === 0) {
      return 'No se pudo conectar con el servidor. Verifica que la API esté iniciada.';
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
    return 'No se pudo completar la operación. Inténtalo nuevamente.';
  }
}