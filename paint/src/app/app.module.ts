import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaintComponent } from './components/paint/paint.component';
import { PaintService } from './services/paint.service';

@NgModule({
  declarations: [
    AppComponent,
    PaintComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PaintService],
  bootstrap: [AppComponent]
})
export class AppModule { }
