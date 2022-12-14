import { ShapeAttr } from "../shape-attributes";
import { AbstractShape } from "../shape-model";

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
}
