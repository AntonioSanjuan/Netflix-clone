import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TopRatedMovie } from 'src/app/models/dataSupplier-models/GetTopRatedMovies/GetTopRatedMoviesResponse.model';
import { FullScreenImageComponent } from '../full-screen-image/full-screen-image.component';
import { MovieAdvancedInfoComponent } from '../movie-advanced-info/movie-advanced-info.component';

@Component({
  selector: 'app-movie-basic-info',
  templateUrl: './movie-basic-info.component.html',
  styleUrls: ['./movie-basic-info.component.scss']
})
export class MovieBasicInfoComponent implements OnInit {
  @Input() movie: TopRatedMovie;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {}

  openImageDialog(): void {
    const dialogImageRef = this.dialog.open(FullScreenImageComponent, {
      height: '90vh',
      width: 'fit-content',
      data: this.movie.images.posterImageToBase64
    });
  }

  openMovieInfoDialog(): void {
    const dialogInfoRef = this.dialog.open(MovieAdvancedInfoComponent, {
      height: '90vh',
      width: '80vh',
      data: this.movie
    });
  }

}
