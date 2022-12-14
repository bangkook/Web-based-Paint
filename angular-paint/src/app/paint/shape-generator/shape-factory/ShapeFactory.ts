import { ShapeAttr } from "../../shape-model/shape-attributes";
import { Circle } from "../../shape-model/shapes/circle-model";
import { Ellipse } from "../../shape-model/shapes/ellipse-model";
import { Line } from "../../shape-model/shapes/line-model";
import { Pen } from "../../shape-model/shapes/pen-model";
import { Rectangle } from "../../shape-model/shapes/rectangle-model";
import { Square } from "../../shape-model/shapes/square-model";
import { Triangle } from "../../shape-model/shapes/triangle-model";

export class ShapeFactory {

    getCircle(id: number, shapeAttr: ShapeAttr, raduis: number): Circle {
        return new Circle(id, shapeAttr, raduis);
    }

    getEllipse(id: number, shapeAttr: ShapeAttr, length: number, height: number): Ellipse {
        return new Ellipse(id, shapeAttr, length, height);
    }

    getSquare(id: number, shapeAttr: ShapeAttr, length: number, cornerRadius: number): Square {
        return new Square(id, shapeAttr, length, cornerRadius);
    }

    getRectangle(id: number, shapeAttr: ShapeAttr, width: number, length: number, cornerRadius: number): Rectangle {
        return new Rectangle(id, shapeAttr, width, length, cornerRadius);
    }

    getLine(id: number, shapeAttr: ShapeAttr, endX: number, endY: number): Line{
        return new Line(id, shapeAttr, endX, endY);
    }

    getTriangle(id: number, shapeAttr: ShapeAttr, radius: number, cornerRadius: number): Triangle {
        return new Triangle(id, shapeAttr, radius, cornerRadius);
    }

    getFreeHand(id: number, shapeAttr: ShapeAttr, points: number[]): Pen {
        return new Pen(id, shapeAttr, points);
    }

}
