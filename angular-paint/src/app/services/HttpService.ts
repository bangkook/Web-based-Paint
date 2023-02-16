
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractShape } from '../paint/shape-model/shape-model';
import { ShapeData } from '../paint/shape-model/shapes/ShapeData';


const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
  })
};

@Injectable()
export class PaintService{
    private paintUrl: string;

    constructor(private http: HttpClient) {
        this.paintUrl = 'http://localhost:8080/';
    }

    public addNewShape(shapeData: ShapeData){ //done
      console.log("Sending request...");
      console.log(shapeData);
      return this.http.post<ShapeData>(this.paintUrl + "add", shapeData, httpOptions);
    }

    public getAllShapes(){
      console.log("Sending request...");
      return this.http.get<Map<number, AbstractShape>>(this.paintUrl + "all", httpOptions);
    }

    public copyShape(shapeId: number, cloneId: number, x: number, y: number) {
      console.log("copying..");
      return this.http.get<void>(this.paintUrl + 'copy/' + shapeId + '/' + cloneId + '/' + x + '/' + y, httpOptions);
    }

    public updateShape(id: number, shapeData: ShapeData) { //done
      console.log("updating..");
      return this.http.put<ShapeData>(this.paintUrl + 'update/' + id, shapeData, httpOptions);
    }

    public deleteShape(id : number) {
      console.log("deleting..");
      return this.http.delete<void>(this.paintUrl + 'delete/' + id, httpOptions);
    }

    public deleteAllShapes() {
      return this.http.delete<void>(this.paintUrl + 'deleteAll', httpOptions);
    }

    public save() {
      console.log("saving..");
      return this.http.get<void>(this.paintUrl + 'save', httpOptions);
    }

    public load() {
      console.log("loading..");
      return this.http.get<string>(this.paintUrl + 'load', httpOptions);
    }

    public undo() {
      console.log("undoing...");
      return this.http.get(this.paintUrl + 'undo');
    }

    public redo() {
      console.log("redoing...");
      return this.http.get(this.paintUrl + 'redo', httpOptions);
    }

}
