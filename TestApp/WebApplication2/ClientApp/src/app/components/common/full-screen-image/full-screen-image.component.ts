import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-full-screen-image',
  templateUrl: './full-screen-image.component.html',
  styleUrls: ['./full-screen-image.component.scss']
})
export class FullScreenImageComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<FullScreenImageComponent>,
    @Inject(MAT_DIALOG_DATA)
      public bas65FullScreenImg: string) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
