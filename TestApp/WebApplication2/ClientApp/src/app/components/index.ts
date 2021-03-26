import { LodableContentComponent } from './common/lodable-content/lodable-content.component';
import { MovieAdvancedInfoComponent } from './movieRepresentations/movie-advanced-info/movie-advanced-info.component';
import { MovieBasicInfoComponent } from './movieRepresentations/movie-basic-info/movie-basic-info.component';
import { MovieMinifiedInfoComponent } from './movieRepresentations/movie-minified-info/movie-minified-info.component';
import { PaginatorComponent } from './common/paginator/paginator.component';
import { TopRatedMovieSearchComponent } from './movieSearchs/topRatedMovieSearch/topRatedMovieSearch.component';
import { SideNavMenuComponent } from './nav-bar/components/sidenav-menu/sidenav-menu.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CarrouselComponent } from './common/carrousel/carrousel.component';
import { GenreMovieSearchComponent } from './movieSearchs/genreMovieSearch/genreMovieSearch.component';
import { MovieLibraryComponent } from './movieLibrary/movieLibrary.component';

export const COMPONENTS: any[] = [
    MovieLibraryComponent,
    NavBarComponent,
    SideNavMenuComponent,
    TopRatedMovieSearchComponent,
    GenreMovieSearchComponent,
    MovieBasicInfoComponent,
    MovieMinifiedInfoComponent,
    MovieAdvancedInfoComponent,
    PaginatorComponent,
    CarrouselComponent,
    LodableContentComponent
];
