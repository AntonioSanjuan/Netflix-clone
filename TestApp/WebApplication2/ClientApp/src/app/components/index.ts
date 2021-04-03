import { LodableContentComponent } from './common/lodable-content/lodable-content.component';
import { MovieAdvancedInfoComponent } from './movieRepresentations/movie-advanced-info/movie-advanced-info.component';
import { MovieBasicInfoComponent } from './movieRepresentations/movie-basic-info/movie-basic-info.component';
import { MovieMinifiedInfoComponent } from './movieRepresentations/movie-minified-info/movie-minified-info.component';
import { PaginatorComponent } from './common/paginator/paginator.component';
import { TopRatedMovieSearchComponent } from './movieSearchs/topRatedMovieSearch/topRatedMovieSearch.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CarrouselComponent } from './common/carrousel/carrousel.component';
import { GenreMovieSearchComponent } from './movieSearchs/genreMovieSearch/genreMovieSearch.component';

export const COMPONENTS: any[] = [
    NavBarComponent,
    SideNavComponent,
    TopRatedMovieSearchComponent,
    GenreMovieSearchComponent,
    MovieBasicInfoComponent,
    MovieMinifiedInfoComponent,
    MovieAdvancedInfoComponent,
    PaginatorComponent,
    CarrouselComponent,
    LodableContentComponent
];
