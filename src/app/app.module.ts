import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import {SDKBrowserModule} from "./shared/sdk";
import '@angular/common/locales/global/es-CO';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SDKBrowserModule.forRoot(),
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es-CO'},
    {provide: 'googleTagManagerId', useValue: 'GTM-WWVNHR3'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
