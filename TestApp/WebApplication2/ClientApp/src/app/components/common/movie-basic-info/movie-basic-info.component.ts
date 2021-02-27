import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullScreenImageComponent } from '../full-screen-image/full-screen-image.component';

@Component({
  selector: 'app-movie-basic-info',
  templateUrl: './movie-basic-info.component.html',
  styleUrls: ['./movie-basic-info.component.scss']
})
export class MovieBasicInfoComponent implements OnInit {
  @Input() tittle: string;
  @Input() description: string;
  @Input() voteAverage: number;
  @Input() base64Image: string;
  @Input() base64BigImage: string;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {}

  openImageDialog(): void {
    const dialogRef = this.dialog.open(FullScreenImageComponent, {
      height: '90vh',
      width: 'fit-content',
      data: this.base64BigImage
    });
  }

}
