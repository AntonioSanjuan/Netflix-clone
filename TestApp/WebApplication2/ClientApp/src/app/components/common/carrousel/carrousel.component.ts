import { Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Movie } from 'src/app/models/dataSupplier-models/Common/movie.model';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent  {
  @Input() public movies: Movie[];
  
  private carrouselTranslated = 0;

  // hardcoded?
  private carrouselStep = 0;

  @ViewChild('carrousel') carrousel: ElementRef;
  @ViewChildren('carrouselMovies') carrouselMovies: QueryList<ElementRef>;
  constructor() {}

  public selectPrevPage() {
    this.calculateCarrouselStep();
    this.carrouselTranslated += this.carrouselStep;
    this.translateCarrousel();
  }

  public selectNextPages() {
    this.calculateCarrouselStep();
    this.carrouselTranslated -= this.carrouselStep;
    this.translateCarrousel();
  }

  private translateCarrousel() {
    this.carrousel.nativeElement.style.transform = `translate(${this.carrouselTranslated}%)`;
  }

  private calculateCarrouselStep() {
    let movieOffsetWidth = this.carrouselMovies.first.nativeElement.offsetWidth;
    let containerOffsetWidth = this.carrousel.nativeElement.offsetWidth;

    if(movieOffsetWidth === containerOffsetWidth) {
      this.carrouselStep = 100;
    } else {
      this.carrouselStep = 65;
    }
  }
}
