import Konva from "konva";
import { ShapeAttr } from "../shape-attributes";
import { AbstractShape } from "../shape-model";
import { ShapeData } from "./ShapeData";

export class Square extends AbstractShape {
  private length : number;
  private cornerRadius: number;

  constructor(id: number, shapeAttr: ShapeAttr, length: number, cornerRadius: number) {
    super(id, "square",shapeAttr);
    this.length = length;
    this.cornerRadius = cornerRadius;
  }

  getLength(): number { return this.length; }

  setLength(length: number): void { this.length = length; }

  getCornerRadius(): number { return this.cornerRadius; }

  setCornerRadius(cornerRadius: number): void { this.cornerRadius = cornerRadius; }

  getShape(shapeData: ShapeData): Konva.Shape{
    let konva = new Konva.Rect;
    return konva.setAttrs({
      x: shapeData.x,
      y: shapeData.y,
      fill: shapeData.fill,
      stroke: shapeData.stroke,
      strokeWidth: shapeData.strokeWidth,
      width: this.length,
      height: this.length,
      cornerRadius: this.cornerRadius,
      rotation: shapeData.rotation,
      draggable: false,
      listening: true,
      visible: true
    })
  }
}
