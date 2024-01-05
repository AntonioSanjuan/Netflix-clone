import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SideNavService } from 'src/app/services/side-nav/side-nav.service';
import { AuthService } from 'src/app/services/user/auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  isAuthenticatedSubsciption: Subscription;

  isSideNavOpened: boolean;
  isSideNavOpenedSubsciption: Subscription;

  constructor(
    private authService: AuthService,
    private sideNavService: SideNavService) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuthenticated();
    this.isSideNavOpened = this.sideNavService.getIsSideNavOpened();

    this.isAuthenticatedSubsciption = this.authService.getIsAuthenticated$().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    this.isSideNavOpenedSubsciption = this.sideNavService.getIsSideNavOpened$().subscribe((isSideNavOpened) => {
      this.isSideNavOpened = isSideNavOpened;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  private unsubscribeAll(): void {
    this.isAuthenticatedSubsciption.unsubscribe();
  }
}
