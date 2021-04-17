import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Movie } from 'src/app/models/dataSupplier-models/Common/movie.model';
import { MovieAdvancedInfoComponent } from '../movie-advanced-info/movie-advanced-info.component';

@Component({
  selector: 'app-movie-minified-info',
  templateUrl: './movie-minified-info.component.html',
  styleUrls: ['./movie-minified-info.component.scss']
})
export class MovieMinifiedInfoComponent implements OnInit {
  @Input() isShowMoreMoviesByGenre: boolean = false;
  @Input() movie: Movie;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {}

  getComponentBackGround(){
    let output;
    if(!this.isShowMoreMoviesByGenre) {
      output = `url(${this.movie.images.backdropImageToBase64})`;
    } else {
      output = `radial-gradient(16px at 60px 50% , #000000 0%, #000000 14px, rgba(0, 0, 0, 0.3) 18px, rgba(0, 0, 0, 0) 19px);`;
    }
    return output;
  }

  openMovieInfoDialog(): void {
    const dialogInfoRef = this.dialog.open(MovieAdvancedInfoComponent, {
      height: '90vh',
      width: '80vh',
      data: this.movie,
      hasBackdrop: true // HERE
    });
  }

  showMore() {
    console.log("que cojones")
  }
}
