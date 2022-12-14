import { ShapeAttr } from "../shape-attributes";
import { AbstractShape } from "../shape-model";

export class Circle extends AbstractShape {
    private radius: number;

    constructor(id: number, shapeAttr: ShapeAttr, raduis: number) {
      super(id, "circle", shapeAttr);
      this.radius = raduis;
    }

  getRadius(): number { return this.radius; }

  setRadius(radius: number): void { this.radius = radius; }

}
