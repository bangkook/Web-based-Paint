import { Circle } from './../models/circle.model';
import { Shape } from './../models/shape.model';
import { ShapeInput } from './../models/shape.input';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PaintService{
    private paintUrl: string;

    constructor(private http: HttpClient) {
        this.paintUrl = 'http://localhost:8080/';
    }

    public addNewShape(shape : ShapeInput){
      console.log("Sending request...");
      console.log(shape);
      return this.http.post<Shape>(this.paintUrl + "add", shape);
    }

    public copyShape(shape : Shape) {
      console.log("copying..");
      return this.http.get<Shape>(this.paintUrl + 'copy'); 
    }

    public updateShape(shape : Shape) {
      console.log("updating..");
      return this.http.put<Shape>(this.paintUrl + 'update/' + shape.id, shape); 
    }

    public deleteShape(shape : Shape) {
      console.log("deleting..");
      return this.http.get<Shape>(this.paintUrl + 'delete/' + shape.id); 
    }

}