import { Injectable } from "@angular/core";
import Konva from "konva";
import { Circle } from "konva/lib/shapes/Circle";
import { Ellipse } from "konva/lib/shapes/Ellipse";
import { Line } from "konva/lib/shapes/Line";
import { Rect } from "konva/lib/shapes/Rect";
import { RegularPolygon } from "konva/lib/shapes/RegularPolygon";
import { Stage } from "konva/lib/Stage";
import { ShapeAttr } from "../paint/shape-model/shape-attributes";
import { ShapeData } from "../paint/shape-model/shapes/ShapeData";
import { KonvaFactory } from "../shape-factory/KonvaFactory";


@Injectable()
export class DrawingService {

  shapeOnMove(shape: string, konva: Konva.Shape, xx: number, x: number, yy: number, y: number, stage: Stage): Konva.Shape {
    if(shape == 'triangle' || shape == 'circle'){
      let r:number
      let a=Math.pow(xx - x, 2)
      let b=Math.pow(yy - y, 2)
      r=Math.sqrt(a+b)
      konva.setAttrs({
        radius: r,
      });
    } else if(shape == 'square') {
      konva.setAttrs({
        width: xx - x,
        height:  xx - x,
      });
    } else if(shape == 'ellipse') {
      let width:number,height:number;
      width = Math.abs(xx - x);
      height = Math.abs(yy - y);
      konva.setAttrs({
        width: width,
        height: height,
      });
    } else if(shape == 'rectangle') {
      konva.setAttrs({
        width: xx - x,
        height: yy - y,
      });
    } else if(shape == 'line') {
      let endX: number, endY : number;
      const pos = stage?.getRelativePointerPosition();
      console.log(pos)
      endX = pos?.x, endY = pos?.y;
      konva.setAttrs({
        points: [x, y, pos?.x, pos?.y],
      })
    }
    return konva
  }

  konvaToData(konva: Konva.Shape): ShapeData{
    let shapeData = new ShapeData()
    shapeData.id = konva._id
    if(konva instanceof Line) {
      shapeData = new ShapeData(new ShapeAttr(konva.points()[0], konva.points()[1], konva.stroke(), konva.strokeWidth(), konva.fill(), konva.rotation(), konva.scaleX()))
      shapeData.type = 'line', shapeData.endX = konva.points()[2], shapeData.endY = konva.points()[3]
    } else if(konva instanceof Rect) {
      shapeData = new ShapeData(new ShapeAttr(konva.x(), konva.y(), konva.stroke(), konva.strokeWidth(), konva.fill(), konva.rotation(), konva.scaleX()))
      if(konva.x() == konva.y()) { shapeData.type = 'square' }
      else { shapeData.type = 'rectangle' }
      shapeData.cornerRadius = 0, shapeData.length = konva.width(), shapeData.width = konva.height()
    } else if(konva instanceof Ellipse) {
      shapeData = new ShapeData(new ShapeAttr(konva.x(), konva.y(), konva.stroke(), konva.strokeWidth(), konva.fill(), konva.rotation(), konva.scaleX()))
      shapeData.type = 'ellipse', shapeData.width = konva.width(), shapeData.height = konva.height()
    } else if(konva instanceof Circle || konva instanceof RegularPolygon) {
      if(konva instanceof Circle) { shapeData.type = 'circle' }
      else { shapeData.type = 'triangle' }
      shapeData.radius = konva.radius()
    } else { throw Error }
    return shapeData
  }

  cloneShape(shape: ShapeData) : Konva.Shape {
    if(shape.type == 'line' || shape.type == 'square' || shape.type == 'rectangle' || shape.type == 'circle' || shape.type == 'ellipse' || shape.type == 'triangle') {
      let konvaFacory = new KonvaFactory()
      return konvaFacory.getShape(shape)
    }
    else { throw Error; }
  }

  saveImage(stage: Stage) {
    function downloadURI(uri:any, name:any) {
      var link = document.createElement('a');
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      link.remove();
    }
    var dataURL = stage.toDataURL({});
    downloadURI(dataURL, 'stage.png');
  }

}
