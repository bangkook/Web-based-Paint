import { ShapeAttr } from "../shape-attributes";
import { AbstractShape } from "../shape-model";
import Konva from "konva";
import { ShapeData } from "./ShapeData";

export class Circle extends AbstractShape {
    private radius: number;

    constructor(id: number, shapeAttr: ShapeAttr, raduis: number) {
      super(id, "circle", shapeAttr);
      this.radius = raduis;
    }

  getRadius(): number { return this.radius; }

  setRadius(radius: number): void { this.radius = radius; }

  getShape(shapeData: ShapeData): Konva.Shape{
    let konva = new Konva.Circle;
    return konva.setAttrs({
      x: shapeData.x,
      y: shapeData.y,
      fill: shapeData.fill,
      radius: this.radius,
      stroke: shapeData.stroke,
      strokeWidth: shapeData.strokeWidth,
      rotation: shapeData.rotation,
      draggable: false,
      listening: true,
      visible: true
    })
  }
}
