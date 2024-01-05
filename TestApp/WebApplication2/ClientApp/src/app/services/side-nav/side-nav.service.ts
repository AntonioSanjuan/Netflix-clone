import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ScreenTypes } from 'src/app/models/internal-types/common/screenWidthTypes/screenWidthTypes.model';

import { DeviceService } from '../user/device/device.service';

@Injectable({
  providedIn: 'root'
})
export class SideNavService implements OnDestroy {
  private isSideNavOpened$ = new BehaviorSubject<boolean>(true);
  private isSideNavOpened = true;

  private screenSizeSubscription: Subscription;

  constructor(private deviceService: DeviceService) {

    this.screenSizeSubscription = this.deviceService.getScreenSizeTypeChanges$().subscribe((screenSizeChanges) => {
      this.handleSideNavStatus(screenSizeChanges);
    });
   }

  ngOnDestroy(){
    this.unsubscribeAll();
  }

  private handleSideNavStatus(screenSize: ScreenTypes) {
    if(screenSize === ScreenTypes.Mobile){
      this.setIsSideNavOpened(false);
    } else {
      this.setIsSideNavOpened(true);
    }
  }
  
  public setIsSideNavOpened(isNavBarOpened: boolean) {
    this.isSideNavOpened = isNavBarOpened;
    this.isSideNavOpened$.next(this.isSideNavOpened);
  }

  public switchIsSideNavOpened() {
    this.isSideNavOpened = !this.isSideNavOpened;
    this.isSideNavOpened$.next(this.isSideNavOpened);
  }

  public getIsSideNavOpened(): boolean {
    return this.isSideNavOpened;
  }

  public getIsSideNavOpened$(): Observable<boolean> {
    return this.isSideNavOpened$.asObservable();
  }

  private unsubscribeAll() {
    this.screenSizeSubscription.unsubscribe();
  }
}
