import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ThemeService } from './core/services/theme.service';
import { AuthService } from './core/services/auth.service';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  isMobile = false;
  sidenavOpen = true;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public theme: ThemeService,
    public auth: AuthService,
    public loading: LoadingService
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
      this.sidenavOpen = !this.isMobile;
    });
  }

  toggleSidenav(): void {
    this.sidenavOpen = !this.sidenavOpen;
  }
}