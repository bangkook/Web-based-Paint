import { ShapeAttr } from "../shape-attributes";
import { AbstractShape } from "../shape-model";

export class Triangle extends AbstractShape {
    private radius: number;
    private cornerRadius: number;

    constructor(id: number, shapeAttr: ShapeAttr, radius: number, cornerRadius: number) {
      super(id, "triangle", shapeAttr);
      this.radius = radius;
      this.cornerRadius = cornerRadius;
    }

  getRadius() { return this.radius; }

  setRadius(radius: number) { this.radius = radius; }

  getCornerRadius(): number { return this.cornerRadius; }

  setCornerRadius(cornerRadius: number): void { this.cornerRadius = cornerRadius; }
}
