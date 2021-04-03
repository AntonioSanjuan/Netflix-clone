import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ScreenTypes } from 'src/app/models/internal-types/common/screenWidthTypes/screenWidthTypes.model';
import { SideNavService } from 'src/app/services/side-nav/side-nav.service';

import { AuthService } from 'src/app/services/user/auth/auth.service';
import { DeviceService } from 'src/app/services/user/device/device.service';

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
    private authService: AuthService,
    private sideNavService: SideNavService,
    private deviceService: DeviceService
    ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.getIsAuthenticated();
    this.isAuthenticatedSubsciption = this.authService.getIsAuthenticated$().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  isMobileDevice(): boolean{
    return (this.deviceService.getScreenSizeType() === ScreenTypes.Mobile);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  switchSideNav() {
    this.sideNavService.switchIsSideNavOpened();
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
