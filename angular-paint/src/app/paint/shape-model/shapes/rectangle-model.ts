import { ShapeAttr } from "../shape-attributes";
import { AbstractShape } from "../shape-model";

export class Rectangle extends AbstractShape {
  private width : number;
  private length : number;
  private cornerRadius: number;

  constructor(id: number, shapeAttr: ShapeAttr, width: number, length: number, cornerRadius: number) {
    super(id, "rectangle", shapeAttr);
    this.width = width;
    this.length = length;
    this.cornerRadius = cornerRadius;
  }

  getWidth(): number { return this.width; }

  getLength(): number { return this.length; }

  setWidth(width: number): void { this.width = width; }

  setLength(length: number): void { this.length = length; }

  getCornerRadius(): number { return this.cornerRadius; }

  setCornerRadius(cornerRadius: number): void { this.cornerRadius = cornerRadius; }
}
