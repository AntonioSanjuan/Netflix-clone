import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from 'src/app/models/dataSupplier-models/Common/movie.model';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements AfterViewInit  {
  @Input() public movies: Movie[];
  
  private carrouselTranslated = 0;

  // hardcoded?
  private carrouselStep = 70;

  @ViewChild('carrouselIdentifier')
    carrouselIdentifier: ElementRef;
  
  constructor() {}

  ngAfterViewInit() {
  }

  public selectPrevPage() {
    this.carrouselTranslated += this.carrouselStep;
    console.log(this.carrouselTranslated)
    document.getElementById("Carrousel").style.transform = `translate(${this.carrouselTranslated}%)`;
  }

  public selectNextPages() {
    this.carrouselTranslated -= this.carrouselStep;
    console.log(this.carrouselTranslated)
    document.getElementById("Carrousel").style.transform = `translate(${this.carrouselTranslated}%)`;
  }

  private getAvailableWidth() {
    return this.carrouselIdentifier.nativeElement.offsetWidth;
  }

}
