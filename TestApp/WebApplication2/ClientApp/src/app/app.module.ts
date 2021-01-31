import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PAGES } from './pages';
import { COMPONENTS } from './components';
import { RoutingModule } from './routing.module';
import { RequestInterceptor } from './interceptors/httpError.interceptor';

const staticImports: any[] = [
  FlexLayoutModule,
  MaterialModule
];
const routesImports: any[] = [
  RoutingModule
];

@NgModule({
  declarations: [
    ...PAGES,
    ...COMPONENTS,
    AppComponent
  ],
  imports: [
    staticImports,
    routesImports,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
