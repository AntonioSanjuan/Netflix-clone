import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Movie } from 'src/app/models/dataSupplier-models/Common/movie.model';
import { IGetMovieInfoResponseDto } from 'src/app/models/dataSupplier-models/GetMovieInfo/getMovieInfoResponse.model';
import { VideoProviderTypes } from 'src/app/models/internal-types/common/videoProviderTypes/videoProviderTypes.model';
import { VideoTypes } from 'src/app/models/internal-types/common/videoTypes/videoTypes.model';
import { MovieDBService } from 'src/app/services/data-supplier/movieDB-fetch.service';

@Component({
  selector: 'app-movie-advanced-info',
  templateUrl: './movie-advanced-info.component.html',
  styleUrls: ['./movie-advanced-info.component.scss']
})
export class MovieAdvancedInfoComponent implements OnInit {
  movieInfo: IGetMovieInfoResponseDto;
  iframeUrl: SafeResourceUrl;

  public isLoading = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Movie,
    private sanitizer: DomSanitizer,
    private movieDBService: MovieDBService
  ) { }

  ngOnInit() {
    this.fetchMovieInfo();
  }
  private fetchMovieInfo() {
    this.isLoading = true;
    this.movieDBService.getMovieInfo(this.data.movieId).then((getMovieInfoResponse: IGetMovieInfoResponseDto) => {
      this.movieInfo = getMovieInfoResponse;

      this.generateIframeData();
      this.isLoading = false;
    });
  }
  private generateIframeData(){
    this.movieInfo.content.videos.forEach((video) => {

      if(video.videoType === VideoTypes.Trailer){
        if(video.site === VideoProviderTypes.Youtube){
          let url = `https://www.youtube.com/embed/${video.videoKey}`
          this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
      }
    });
  }

}
