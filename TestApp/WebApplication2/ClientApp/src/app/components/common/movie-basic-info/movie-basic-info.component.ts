import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-basic-info',
  templateUrl: './movie-basic-info.component.html',
  styleUrls: ['./movie-basic-info.component.scss']
})
export class MovieBasicInfoComponent implements OnInit {
  @Input() tittle: string;
  @Input() description: string;
  @Input() base64Image: string;

  constructor() { }

  ngOnInit() {
  }

}
