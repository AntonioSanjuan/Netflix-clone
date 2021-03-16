import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from 'src/app/models/dataSupplier-models/Common/movie.model';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements AfterViewInit  {
  @Input() private movies: Movie[];

  private startIndex = 0;

  public moviesToShow: Movie[] = [];
  private sizeOfMoviesToShow = 0;
  
  @ViewChild('carrouselIdentifier')
    carrouselIdentifier: ElementRef;
  
  constructor(
    private cdRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.calculatePagesLength();
  }


  private calculatePagesLength() {
    let screenWidthSize = this.getAvailableWidth();

    if (screenWidthSize < 600) {
      this.sizeOfMoviesToShow = 1;
    } else if (screenWidthSize >= 600 && screenWidthSize <= 1000) {
      this.sizeOfMoviesToShow = 2;
    } else if (screenWidthSize > 1000) {
      this.sizeOfMoviesToShow = 3;
    }

    this.moviesToShow = [...this.movies.slice(this.startIndex, this.startIndex + this.sizeOfMoviesToShow)];
    this.cdRef.detectChanges();
    console.log(this.moviesToShow);
  }


  public selectPrevPage() {
    this.startIndex = this.startIndex - this.sizeOfMoviesToShow;
    this.calculatePagesLength();
  }

  public selectNextPages() {
    this.startIndex = this.startIndex + this.sizeOfMoviesToShow;
    this.calculatePagesLength();
  }

  private getAvailableWidth() {
    return this.carrouselIdentifier.nativeElement.offsetWidth;
  }

}
