import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-portal-page',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './portal.page.html',
  styleUrl: './portal.page.scss',
})
export class PortalPage {
  readonly todayLabel = new Intl.DateTimeFormat('es-GT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  constructor(readonly auth: AuthService) {}
}
