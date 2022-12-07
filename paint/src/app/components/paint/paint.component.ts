import { Shape } from './../../models/shape.model';
import { Circle } from './../../models/circle.model';
import { ShapeInput } from './../../models/shape.input';
import { Component, Input, OnInit } from '@angular/core';
import { PaintService } from 'src/app/services/paint.service';
import "./../../models/shape.type";
import { map } from 'rxjs';

@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.css']
})
export class PaintComponent implements OnInit {
  
  input : ShapeInput = new ShapeInput;
  shapesMap : Map<number, Shape> = new Map<number, Shape>;

  constructor(private paintService : PaintService) { }

  ngOnInit(): void {
  }

  redo(){console.log("redo")}
  undo(){console.log("undo")}
  lineSegment(){console.log("lineSegment")}
  square(){console.log("square")}
  ellipse(){console.log("ellipse")}
  triangle(){console.log("triangle")}
  circle(){console.log("circle")}
  
  addNewShape(shapeInput : ShapeInput){
    this.paintService.addNewShape(shapeInput).subscribe( res => {
      this.shapesMap.set(res.id, res);
      console.log(this.shapesMap.get(res.id));
    })
  }

  updateShape(shape : Shape){
    this.paintService.updateShape(shape).subscribe(res => {
      this.shapesMap.set(res.id, res);
    })
  }

  copyShape(shape : Shape){
    this.paintService.copyShape(shape).subscribe(res => {
      this.shapesMap.set(res.id, res);
    })
  }

  deleteShape(shape : Shape){
    this.paintService.deleteShape(shape).subscribe(res => {
      this.shapesMap.delete(shape.id);
    })
  }

  createCircle(x: number, y: number, radius: number){
    this.input.setCircle(x, y, radius);
    this.addNewShape(this.input);
  }

  createSquare(x: number, y: number, length: number){
    this.input.setSquare(x, y, length);
    this.addNewShape(this.input);
  }

  createRectangle(x: number, y: number, length: number, width: number){
    this.input.setRectangle(x, y, length, width);
    this.addNewShape(this.input);
  }

  createEllipse(x: number, y: number, width: number, height: number){
    this.input.setEllipse(x, y, width, height);
    this.addNewShape(this.input);
  }

  createLine(x1: number, y1: number, x2: number, y2: number){
    this.input.setLine(x1, y1, x2, y2);
    this.addNewShape(this.input);
  }

  createTriangle(x: number, y: number,  width: number, height: number){
    this.input.setTriangle(x, y, width, height);
    this.addNewShape(this.input);
  }

 
}
