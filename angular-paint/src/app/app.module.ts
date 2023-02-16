import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PaintComponent } from './paint/paint.component';
import { DrawingService } from './services/DrawingService';
import { PaintService } from './services/HttpService';
@NgModule({
  declarations: [
    AppComponent,
    PaintComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [PaintService, DrawingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
