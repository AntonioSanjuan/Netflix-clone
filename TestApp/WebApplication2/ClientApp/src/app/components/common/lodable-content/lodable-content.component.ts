import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-lodable-content',
  templateUrl: './lodable-content.component.html',
  styleUrls: ['./lodable-content.component.scss']
})
export class LodableContentComponent {
  @Input() isLoading = false;

  constructor() { }
}
