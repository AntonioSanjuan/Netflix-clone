import { Subscription } from 'rxjs';
import { Component } from '@angular/core';

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
