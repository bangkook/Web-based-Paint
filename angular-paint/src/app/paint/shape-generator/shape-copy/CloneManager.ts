import { Line } from './../../shape-model/shapes/line-model';
import { Ellipse } from './../../shape-model/shapes/ellipse-model';
import { Square } from './../../shape-model/shapes/square-model';
import { Rectangle } from './../../shape-model/shapes/rectangle-model';
import { Circle } from './../../shape-model/shapes/circle-model';
import { AbstractShape } from "../../shape-model/shape-model";
import { Triangle } from '../../shape-model/shapes/triangle-model';
import { ShapeBuilder } from '../shape-builder/builder/ShapeBuilder';
import { IBuilder } from '../shape-builder/builder/IBuilder';

export class CloneManager{
    shapeBuilder : ShapeBuilder = new ShapeBuilder();

    public cloneShape(shape : AbstractShape) : IBuilder{
        if(shape instanceof Circle){
            this.shapeBuilder.buildAttr(shape.getShapeAttr());
            return this.shapeBuilder.buildCircl(shape.getRadius());
        } else if(shape instanceof Rectangle) {
            this.shapeBuilder.buildAttr(shape.getShapeAttr());
            return this.shapeBuilder.buildRectangle(shape.getWidth(), shape.getLength(), shape.getCornerRadius());
        } else if(shape instanceof Square) {
            this.shapeBuilder.buildAttr(shape.getShapeAttr());
            return this.shapeBuilder.buildSquare(shape.getLength(), shape.getCornerRadius());
        } else if(shape instanceof Ellipse) {
            this.shapeBuilder.buildAttr(shape.getShapeAttr());
            return this.shapeBuilder.buildEllipse(shape.getWidth(), shape.getHieght());
        } else if(shape instanceof Line) {
            this.shapeBuilder.buildAttr(shape.getShapeAttr());
            return this.shapeBuilder.buildLine(shape.getEndX(), shape.getEndY());
        } else if(shape instanceof Triangle) {
            this.shapeBuilder.buildAttr(shape.getShapeAttr());
            return this.shapeBuilder.buildTriangle(shape.getRadius(), shape.getCornerRadius());
        } else { throw Error; }
    }
}
