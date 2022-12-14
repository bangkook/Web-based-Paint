import { Injectable } from '@angular/core';
import Konva from 'konva';
import { KonvaFactory } from '../shape-generator/konva-factory/KonvaFactory';
import { ShapeFactory } from '../shape-generator/shape-factory/ShapeFactory';
import { ShapeAttr } from '../shape-model/shape-attributes';
import { AbstractShape } from '../shape-model/shape-model';
import { Circle } from '../shape-model/shapes/circle-model';
import { Ellipse } from '../shape-model/shapes/ellipse-model';
import { Line } from '../shape-model/shapes/line-model';
import { Pen } from '../shape-model/shapes/pen-model';
import { Rectangle } from '../shape-model/shapes/rectangle-model';
import { Square } from '../shape-model/shapes/square-model';
import { Triangle } from '../shape-model/shapes/triangle-model';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {

  constructor() { }
  shapeFactory: ShapeFactory = new ShapeFactory();
    konvaFactory: KonvaFactory = new KonvaFactory(new Konva.Shape);

    konvaToShape(konva: Konva.Shape): AbstractShape {
        let shape: AbstractShape | any;
        let attributes = new ShapeAttr();
        attributes.setAttrs(konva.x(), konva.y(), konva.scaleX(), konva.stroke(), konva.strokeWidth(), konva.fill(), konva.rotation());
        if(konva instanceof Konva.Circle) {
            return this.shapeFactory.getCircle(konva._id, attributes, konva.radius());
        } else if(konva instanceof Konva.Rect && konva.width() != konva.height()) {
            return this.shapeFactory.getRectangle(konva._id, attributes, konva.height(), konva.width(), 0);
        } else if(konva instanceof Konva.RegularPolygon) {
            return this.shapeFactory.getTriangle(konva._id, attributes, konva.radius(), 0);
        } else if(konva instanceof Konva.Line &&  konva.points().length <= 4) {
            let points: number[] = konva.points();
            return this.shapeFactory.getLine(konva._id, attributes, points[2], points[3]);
        } else if (konva instanceof Konva.Ellipse) {
            return this.shapeFactory.getEllipse(konva._id, attributes, konva.width(), konva.height());
        } else if(konva instanceof Konva.Rect) {
            return this.shapeFactory.getSquare(konva._id, attributes, konva.height(), 0);
        } else if(konva instanceof Konva.Line) {
            return this.shapeFactory.getFreeHand(konva._id, attributes, konva.points());
        }
        return shape;
    }

    shapeToKonva(shape: AbstractShape): Konva.Shape {
        let konva = new Konva.Shape(), attributes = shape.getShapeAttr();

        if(shape instanceof Circle) {
            return this.konvaFactory.getKonvaCircle(attributes, shape.getRadius());
        } else if(shape instanceof Rectangle) {
            return this.konvaFactory.getKonvaRectangle(attributes, shape.getWidth(), shape.getLength(), shape.getCornerRadius());
        } else if(shape instanceof Square) {
            return this.konvaFactory.getKonvaSquare(attributes, shape.getLength(), shape.getCornerRadius());
        } else if(shape instanceof Triangle) {
            return this.konvaFactory.getKonvaTriangle(attributes, shape.getRadius(), shape.getCornerRadius());
        } else if(shape instanceof Ellipse) {
            return this.konvaFactory.getKonvaEllipse(attributes, shape.getWidth(), shape.getHieght());
        } else if(shape instanceof Line) {
            return this.konvaFactory.getKonvaLine(attributes, shape.getEndX(), shape.getEndY());
        } else if(shape instanceof Pen) {
            return this.konvaFactory.getFreeHand(attributes, shape.getPoints());
        }
        return konva;
    }

}
