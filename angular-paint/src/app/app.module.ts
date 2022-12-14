import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PaintComponent } from './paint/paint.component';
import { PaintService } from './paint/services/HttpService';
import { Update } from './paint/services/UpdateService';
import { ConversionService } from './paint/services/conversion.service';
import { ShapeDataService } from './paint/services/ShapeDataService';


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
  providers: [PaintService, Update, ShapeDataService, ConversionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
