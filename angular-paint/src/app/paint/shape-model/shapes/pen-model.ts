import Konva from "konva";
import { Line } from "konva/lib/shapes/Line";
import { ShapeAttr } from "../shape-attributes";
import { AbstractShape } from "../shape-model";
import { ShapeData } from "./ShapeData";

export class Pen extends AbstractShape {
  points: number[];

  constructor(id: number, shapeAttr: ShapeAttr, points: number[]) {
    super(id, "freehand", shapeAttr);
    this.points = points
  }

  addPoint(point: number) {
    this.points.push(point);
  }

  getPoints(): number[] { return this.points; }

  setPoints(points: number[]) { this.points = points; }

  getShape(shapeData: ShapeData): Konva.Shape{
    let konva = new Konva.Line()
        return konva.setAttrs({
            //x: shapeAttr.getStartX(),
            //y : shapeAttr.getStartY(),
            points: shapeData.points,
            fill: shapeData.fill,
            stroke: shapeData.stroke,
            strokeWidth: shapeData.strokeWidth,
            draggable: false,
            rotation: shapeData.rotation,
            listening: true,
            visible: true
        })
  }

}
