import { IBuilder } from './IBuilder';
import { ShapeAttr } from "src/app/paint/shape-model/shape-attributes";
import { CircleBuilder } from "../shapes-builder/CircleBuilder";
import { EllipseBuilder } from "../shapes-builder/EllipseBuilder";
import { LineBuilder } from "../shapes-builder/LineBuilder";
import { RectangleBuilder } from "../shapes-builder/RectangleBuilder";
import { SquareBuilder } from "../shapes-builder/SquareBuilder";
import { TriangleBuilder } from "../shapes-builder/TriangleBuilder";
import { FreeHandBuilder } from '../shapes-builder/FreeHandBuilder';

export class ShapeBuilder {

    shapeAttr: ShapeAttr = new ShapeAttr();
    builder : IBuilder | any;

    buildDetailedAttr(startX: number, startY: number, scaleX: number, stroke: string,
        strokeWidth: number, fill: string, rotation: number): ShapeAttr {
        this.shapeAttr.setStartX(startX);
        this.shapeAttr.setStartY(startY);
        this.shapeAttr.setStroke(stroke);
        this.shapeAttr.setStrokeWidth(strokeWidth);
        this.shapeAttr.setFill(fill);
        this.shapeAttr.setRotation(rotation);
        this.shapeAttr.setScaleX(scaleX);
        return this.shapeAttr;
    }

    buildAttr(shapeAttr: ShapeAttr): void{ this.shapeAttr = shapeAttr; }

    buildRectangle(width: number, length: number, cornerRadius: number) {
        return new RectangleBuilder(this.shapeAttr, width, length, cornerRadius);
    }

    buildSquare(length: number, cornerRadius: number) {
        return new SquareBuilder(this.shapeAttr, length, cornerRadius);
    }

    buildEllipse(length: number, heigth: number) {
        return new EllipseBuilder(this.shapeAttr, length, heigth);
    }

    buildCircl(radius: number) {
        return new CircleBuilder(this.shapeAttr, radius);
    }

    buildLine(endX: number, endY: number) {
        console.log(this.shapeAttr.getStartX());
        return new LineBuilder(this.shapeAttr, endX, endY);
    }

    buildTriangle(radius: number, cornerRadius: number ) {
        return new TriangleBuilder(this.shapeAttr, radius, cornerRadius);
    }

    buildFreeHand(points: number[]) {
        return new FreeHandBuilder(this.shapeAttr, points);
    }

    getShapeAttr(): ShapeAttr { return this.shapeAttr; }
   // getBuilder(): IBuilder {return this.builder;}

}
