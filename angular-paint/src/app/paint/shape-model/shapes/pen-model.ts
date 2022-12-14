import { ShapeAttr } from "../shape-attributes";
import { AbstractShape } from "../shape-model";
import { Point } from "./point-model";

export class Pen extends AbstractShape {
  points: number[];

  constructor(id: number, shapeAttr: ShapeAttr, points: number[]) {
    super(id, "freehand", shapeAttr);
    this.points = points
  }

  addPoint(point: number) {
    this.points.push(point);
  }

  removePoint(point: Point) {
    // this.points.
  }

  getPoints(): number[] { return this.points; }

  setPoints(points: number[]) { this.points = points; }

}
