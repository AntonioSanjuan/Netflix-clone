import { Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Movie } from 'src/app/models/dataSupplier-models/Common/movie.model';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent  {
  @Input() public movies: Movie[];
  
  private firstMovieShownIndex = 0;

  public isPrevPageAvailable: boolean;
  public isNextPageAvailable: boolean;

  @ViewChild('carrousel') carrousel: ElementRef;
  @ViewChildren('carrouselMovies') carrouselMovies: QueryList<ElementRef>;
  constructor() {}

  public selectPrevPage() {
    this.calculatePrevCarrouselStep();
    this.translateCarrousel();
  }

  public selectNextPages() {
    this.calculateNextCarrouselStep();
    this.translateCarrousel();
  }

  private translateCarrousel() {
    this.carrousel.nativeElement.style.transform = `translate(-${this.convertMovieIndexToPx()}px)`;
  }

  private calculateNextCarrouselStep() {
    let carrouselMoviesTranslation = this.getCarrouselMoviesTranslation();
    if(this.firstMovieShownIndex + carrouselMoviesTranslation < this.movies.length - carrouselMoviesTranslation) {
      this.firstMovieShownIndex += carrouselMoviesTranslation;
    }else{
      this.firstMovieShownIndex = this.movies.length - carrouselMoviesTranslation;
    }
  }

  private calculatePrevCarrouselStep() {
    let carrouselMoviesTranslation = this.getCarrouselMoviesTranslation();
    if(this.firstMovieShownIndex - carrouselMoviesTranslation > 0) {
      this.firstMovieShownIndex -= carrouselMoviesTranslation;
    }else{
      this.firstMovieShownIndex = 0;
    }
  }
  
  private convertMovieIndexToPx(): number {
    return this.firstMovieShownIndex * this.getMovieWidth();
  }

  private getCarrouselMoviesTranslation() {
    let movieWidth = this.getMovieWidth();
    let containerWidth = this.getCarrouselWidth();
    
    let visibleMoviesInCarrousel = Math.trunc(containerWidth / movieWidth);
    return visibleMoviesInCarrousel;
  }

  private getCarrouselWidth(): number {
    let containerElement = this.carrousel;
    return containerElement ? containerElement.nativeElement.offsetWidth : undefined;
  }

  private getMovieWidth(): number {
    let movieElement = this.carrouselMovies;
    return movieElement ? movieElement.first.nativeElement.offsetWidth : undefined;
  }
}
