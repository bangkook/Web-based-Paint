import Konva from "konva";
import { ShapeAttr } from "../shape-attributes";
import { AbstractShape } from "../shape-model";
import { ShapeData } from "./ShapeData";

export class Line extends AbstractShape{
  private endX : number;
  private endY : number;

  constructor(id: number, shapeAttr: ShapeAttr, endX: number, endY: number) {
    super(id, "line", shapeAttr);
    this.endX = endX;
    this.endY = endY;
  }

  getEndX(): number { return this.endX; }

  getEndY(): number { return this.endY; }

  setEndX(endX: number): void { this.endX = endX; }

  setEndY(endY: number): void { this.endY = endY; }

  getShape(shapeData: ShapeData){
    let konva = new Konva.Line;
    return konva.setAttrs({
      points: [shapeData.x, shapeData.y, this.endX, this.endY],
      fill: shapeData.fill,
      stroke: shapeData.stroke,
      strokeWidth: shapeData.strokeWidth,
      draggable: true,
      // rotation: shapeAttr.getRotation(),
      listening: true,
      visible: true
    })
  }
}
