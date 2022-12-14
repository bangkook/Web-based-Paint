import { ShapeAttr } from "../shape-attributes";
import { AbstractShape } from "../shape-model";

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
}
