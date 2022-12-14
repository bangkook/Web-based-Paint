import { ShapeAttr } from "../shape-attributes";
import { AbstractShape } from "../shape-model";

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
}
