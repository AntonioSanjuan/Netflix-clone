import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {
  public isLoading$ = new Subject<boolean>();

  private isLoading = false;
  private loadingCalls = 0;

  constructor() { }

  showLoaderSpinner() {
    this.loadingCalls++;
    this.isLoading = true;
    this.refreshIsLoadingSubject();
  }

  hideLoaderSpinner() {
    if (this.loadingCalls > 0) {
      this.loadingCalls--;
      this.handleLoadingCallDecreases();
    }
  }

  private handleLoadingCallDecreases() {
    if (this.loadingCalls === 0) {
      this.isLoading = false;
      this.refreshIsLoadingSubject();
    }
  }

  private refreshIsLoadingSubject() {
    this.isLoading$.next(this.isLoading);

  }
}
