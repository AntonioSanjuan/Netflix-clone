import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-lodable-content',
  templateUrl: './lodable-content.component.html',
  styleUrls: ['./lodable-content.component.scss']
})
export class LodableContentComponent implements OnInit, OnDestroy {
  @Input() isLoading = false;
  @Input() changeEvent: Observable<void>;

  private changeEventSubscription: Subscription;

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy() {
    this.unsubscribeAll();
  }

  initialize() {
    this.changeEventSubscription = this.changeEvent.subscribe(() => {
      this.changeDetectorRequest();
    })
  };

  unsubscribeAll() {
    this.changeEventSubscription.unsubscribe();
  }

  changeDetectorRequest() {
    console.log("mierda");
    this.cdRef.markForCheck();
  }
}
