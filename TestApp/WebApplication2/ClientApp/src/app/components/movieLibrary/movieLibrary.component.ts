import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'movieLibrary-info',
  templateUrl: './movieLibrary.component.html',
  styleUrls: ['./movieLibrary.component.scss']
})
export class MovieLibraryComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {}

  // getComponentBackGround(){
  //   let output = `url(${this.movie.images.backdropImageToBase64})`;
  //   return output;
  // }

  // openMovieInfoDialog(): void {
  //   const dialogInfoRef = this.dialog.open(MovieAdvancedInfoComponent, {
  //     height: '90vh',
  //     width: '80vh',
  //     data: this.movie
  //   });
  // }
}
