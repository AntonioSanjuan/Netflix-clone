import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Movie } from 'src/app/models/dataSupplier-models/Common/movie.model';
import { DeviceService } from 'src/app/services/user/device/device.service';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements OnInit {
  @Input() public movies: Movie[];
  @Input() public hasShowMoreMovie: boolean = false;

  private firstMovieShownIndex = 0;

  public isPrevPageAvailable: boolean = false;
  public isNextPageAvailable: boolean = true;

  @ViewChild('carrousel') carrousel: ElementRef;
  @ViewChildren('carrouselMovies') carrouselMovies: QueryList<ElementRef>;

  constructor(private deviceService: DeviceService) {}

  ngOnInit() {
    this.deviceService.getScreenSizeChanges$().subscribe((_) => {
      if(this.firstMovieShownIndex !== 0) {
        this.translateCarrousel();
      }
    })

    if(this.hasShowMoreMovie) {
      this.movies.push({} as Movie);
    }
  }

  public selectPrevPage() {
    this.calculatePrevCarrouselStep();
    this.translateCarrousel();
    this.calculatePageAvailability();
  }

  public selectNextPages() {
    this.calculateNextCarrouselStep();
    this.translateCarrousel();
    this.calculatePageAvailability();
  }

  private translateCarrousel() {
    this.carrousel.nativeElement.style.transform = `translate(-${this.convertMovieIndexToPx()}px)`;
  }

  private calculateNextCarrouselStep() {
    let carrouselMoviesTranslation = this.getCarrouselMoviesTranslation();
    if(this.firstMovieShownIndex + carrouselMoviesTranslation < this.movies.length - carrouselMoviesTranslation) {
      this.firstMovieShownIndex += carrouselMoviesTranslation;
    } else {
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

  private calculatePageAvailability() {
    let carrouselMoviesTranslation = this.getCarrouselMoviesTranslation();
    this.isPrevPageAvailable = !(this.firstMovieShownIndex === 0)
    this.isNextPageAvailable = !(this.firstMovieShownIndex + carrouselMoviesTranslation === this.movies.length)
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
