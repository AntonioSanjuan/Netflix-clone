import { LodableContentComponent } from './common/lodable-content/lodable-content.component';
import { MovieAdvancedInfoComponent } from './movieRepresentations/movie-advanced-info/movie-advanced-info.component';
import { MovieBasicInfoComponent } from './movieRepresentations/movie-basic-info/movie-basic-info.component';
import { MovieMinifiedInfoComponent } from './movieRepresentations/movie-minified-info/movie-minified-info.component';
import { PaginatorComponent } from './common/paginator/paginator.component';
import { TopRatedMovieSearchComponent } from './movieSearchs/topRatedMovieSearch/topRatedMovieSearch.component';
import { NavMenuComponent } from './nav-bar/components/nav-menu/nav-menu.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

export const COMPONENTS: any[] = [
    NavBarComponent,
    NavMenuComponent,
    TopRatedMovieSearchComponent,
    MovieBasicInfoComponent,
    MovieMinifiedInfoComponent,
    MovieAdvancedInfoComponent,
    PaginatorComponent,
    LodableContentComponent
];
