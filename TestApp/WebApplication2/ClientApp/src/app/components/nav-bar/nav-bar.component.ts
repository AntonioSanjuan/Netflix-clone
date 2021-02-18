import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/user/Auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  isAuthenticatedSubsciption: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.getIsAuthenticated();
    this.isAuthenticatedSubsciption = this.authService.getIsAuthenticated$().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  goToHomePage() {
    this.router.navigate(['home']);
  }

  goToLoginPage() {
    this.router.navigate(['login']);
  }

  private unsubscribeAll(): void {
    this.isAuthenticatedSubsciption.unsubscribe();
  }

}
