import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { PAGES } from './pages';
import { COMPONENTS } from './components';
import { FlexLayoutModule } from '@angular/flex-layout';

const staticImports: any[] = [
  FlexLayoutModule,
  MaterialModule
];

@NgModule({
  declarations: [
    ...PAGES,
    ...COMPONENTS,
    AppComponent
  ],
  imports: [
    staticImports,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
