import { HostListener, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ScreenTypes } from 'src/app/models/internal-types/common/screenWidthTypes/screenWidthTypes.model';

@Injectable({
  providedIn: 'root'
})

export class DeviceService {
  public screenSizeType: ScreenTypes = undefined;
  public screenSizeTypeChanges$ = new BehaviorSubject<ScreenTypes>(this.screenSizeType);

  public screenSizeChanges$ = new BehaviorSubject<boolean>(false);

  constructor() { 
    this.calculateScreenSize(window.innerWidth);

    window.addEventListener('resize', (event) => {
      this.calculateScreenSize(window.innerWidth);
      
      this.screenSizeChanges$.next(true)
    });
  }

  public getScreenSizeType(): ScreenTypes {
    return this.screenSizeType;
  }

  public getScreenSizeTypeChanges$(): Observable<ScreenTypes> {
    return this.screenSizeTypeChanges$.asObservable();
  }

  public getScreenSizeChanges$(): Observable<boolean> {
    return this.screenSizeChanges$.asObservable();
  }

  private calculateScreenSize(deviceScreenWidth: number){
    if(deviceScreenWidth > ScreenTypes.Tablet) {
      this.setScreenSizeType(ScreenTypes.Computer);
    } else if(deviceScreenWidth > ScreenTypes.Mobile) {
      this.setScreenSizeType(ScreenTypes.Tablet);
    } else if(deviceScreenWidth <= ScreenTypes.Mobile) {
      this.setScreenSizeType(ScreenTypes.Mobile);
    } else {
      this.setScreenSizeType(undefined);
    }
  }

  private setScreenSizeType(newScreenSize: ScreenTypes){
    if(this.screenSizeType !== newScreenSize){
      this.screenSizeType = newScreenSize;
      this.screenSizeTypeChanges$.next(this.screenSizeType);
    }
  }
}
