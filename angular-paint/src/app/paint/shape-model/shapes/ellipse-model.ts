import Konva from "konva";
import { ShapeAttr } from "../shape-attributes";
import { AbstractShape } from "../shape-model";
import { ShapeData } from "./ShapeData";

export class Ellipse extends AbstractShape {
    private width : number;
    private height : number;

    constructor(id: number, shapeAttr: ShapeAttr, width: number, height: number) {
      super(id, "ellipse", shapeAttr);
      this.width = width;
      this.height = height;
    }

  getWidth(): number { return this.width; }

  getHieght(): number { return this.height; }

  setWidth(width: number): void { this.width = width; }

  setHeight(height: number): void { this.height = height; }

  getShape(shapeData: ShapeData){
    let konva = new Konva.Ellipse;
    return konva.setAttrs({
      x: shapeData.x,
      y: shapeData.y,
      stroke: shapeData.stroke,
      fill: shapeData.fill,
      strokeWidth: shapeData.strokeWidth,
      width: this.width,
      height: this.height,
      rotation: shapeData.rotation,
      draggable: false,
      listening: true,
      visible: true
    });
  }
}
