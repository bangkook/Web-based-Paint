import Konva from "konva";
import { ShapeAttr } from "../shape-attributes";
import { AbstractShape } from "../shape-model";
import { ShapeData } from "./ShapeData";

export class Triangle extends AbstractShape {
    private radius: number;

    constructor(id: number, shapeAttr: ShapeAttr, radius: number) {
      super(id, "triangle", shapeAttr);
      this.radius = radius;
    }

  getRadius() { return this.radius; }

  setRadius(radius: number) { this.radius = radius; }


  getShape(shapeData: ShapeData): Konva.Shape{
    let konva = new Konva.RegularPolygon;
    return konva.setAttrs({
        x: shapeData.x,
        y: shapeData.y,
        fill: shapeData.fill,
        radius: shapeData.radius,
        stroke: shapeData.stroke,
        strokeWidth: shapeData.strokeWidth,
        rotation: shapeData.rotation,
        draggable: false,
        listening: true,
        visible: true
    })
  }
}
