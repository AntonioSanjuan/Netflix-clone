import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { PAGES } from './pages';
import { COMPONENTS } from './components';
import { RoutingModule } from './routing.module';

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
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
