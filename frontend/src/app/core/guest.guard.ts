import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Si ya tiene una sesión activa e intenta meterse al login por la URL:
  if (auth.isAuthenticated()) {
    // Opción A: Simplemente redirigirlo a su panel principal para que no vea el login
    return router.createUrlTree(['/app/access']); 
    
    // O si prefieres cerrar sesión automáticamente por seguridad al intentar entrar al login:
    // auth.logout();
    // return true;
  }

  // Si no está logueado, se le permite ver el login con total normalidad
  return true;
};