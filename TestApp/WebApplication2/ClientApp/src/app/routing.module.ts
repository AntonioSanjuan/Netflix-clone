import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { AuthGuard } from './guards/AuthGuard.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

export enum PagePaths {
    Login = 'login',
    Home = 'home'
}

// export const routingConfiguration: ExtraOptions = { scrollPositionRestoration: 'top', anchorScrolling: 'enabled' };
export const routes: Routes = [
  {
    path: '',
    redirectTo: PagePaths.Login,
    pathMatch: 'full'
  },
  {
    path: PagePaths.Login,
    component: LoginComponent,
    data: {
      animation: 'Login'
    },
  },
  {
    path: PagePaths.Home,
    component: HomeComponent,
    data: {
      animation: 'Home'
    },
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class RoutingModule {}
