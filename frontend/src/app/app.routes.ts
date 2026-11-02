import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { adminGuard } from './core/role.guard';
import { guestGuard } from './core/guest.guard'; 
import { LandingPage } from './pages/landing/landing.page';
import { LoginPage } from './pages/login/login.page';
import { PortalPage } from './pages/portal/portal.page';
import { PortalSectionPage } from './pages/portal/portal-section.page';

export const routes: Routes = [
  { 
    path: '', 
    component: LandingPage, 
    title: 'AulaBase | Gestión académica',
    canActivate: [guestGuard] 
  },
  { 
    path: 'login', 
    component: LoginPage, 
    title: 'Iniciar sesión | AulaBase',
    canActivate: [guestGuard] 
  },
  {
    path: 'app',
    component: PortalPage,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'overview' },
      { path: 'overview', component: PortalSectionPage, data: { section: 'overview' } },
      { path: 'courses', component: PortalSectionPage, data: { section: 'courses' } },
      { path: 'students', component: PortalSectionPage, data: { section: 'students' } },
      { path: 'grades', component: PortalSectionPage, data: { section: 'grades' } },
      { path: 'reports', component: PortalSectionPage, data: { section: 'reports' } },
      { path: 'access', component: PortalSectionPage, canActivate: [adminGuard], data: { section: 'access' } },
    ],
  },
  { path: '**', redirectTo: '' },
];