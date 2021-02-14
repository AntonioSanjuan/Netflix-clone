import { LodableContentComponent } from './common/lodable-content/lodable-content.component';
import { MovieBasicInfoComponent } from './common/movie-basic-info/movie-basic-info.component';
import { PaginatorComponent } from './common/paginator/paginator.component';
import { TopRatedMovieSearchComponent } from './movieSearchs/topRatedMovieSearch/topRatedMovieSearch/topRatedMovieSearch.component';
import { NavMenuComponent } from './nav-bar/components/nav-menu/nav-menu.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

export const COMPONENTS: any[] = [
    NavBarComponent,
    NavMenuComponent,
    TopRatedMovieSearchComponent,
    MovieBasicInfoComponent,
    PaginatorComponent,
    LodableContentComponent
];
