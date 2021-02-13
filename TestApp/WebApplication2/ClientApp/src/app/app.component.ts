import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingSpinnerService } from './services/loading-spinner/loading-spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoadingSubscription: Subscription;
  isLoading = false;

  title = 'app';

  constructor() {}
}
