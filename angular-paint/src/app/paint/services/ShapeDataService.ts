import { Injectable } from "@angular/core";
import { AbstractShape } from "../shape-model/shape-model";
import { Circle } from "../shape-model/shapes/circle-model";
import { Ellipse } from "../shape-model/shapes/ellipse-model";
import { Line } from "../shape-model/shapes/line-model";
import { Pen } from "../shape-model/shapes/pen-model";
import { Rectangle } from "../shape-model/shapes/rectangle-model";
import { Square } from "../shape-model/shapes/square-model";
import { Triangle } from "../shape-model/shapes/triangle-model";

@Injectable()
export class ShapeDataService {

    json: JSON | any;
    shape: AbstractShape | any;

    formShapeData(shape: AbstractShape) {
        this.json = {
            "type": shape.getType(),
            "x": shape.getShapeAttr().getStartX(),
            "y": shape.getShapeAttr().getStartY(),
            "stroke": shape.getShapeAttr().getStroke(),
            "scaleX": shape.getShapeAttr().getScaleX(),
            "strokeWidth": shape.getShapeAttr().getStrokeWidth(),
            "fill": shape.getShapeAttr().getFill(),
            "rotation": shape.getShapeAttr().getRotation()
        }
        if(shape instanceof Rectangle) {
            let rect = shape as Rectangle;
            this.json["id"] = rect.getId();
            this.json["width"] = rect.getWidth();
            this.json["length"] = rect.getLength();
            this.json["cornerRadius"] = rect.getCornerRadius();
        }
        else if(shape instanceof Triangle) {
            let tri = shape as Triangle;
            this.json["id"] = tri.getId();
            this.json["radius"] = tri.getRadius();
            this.json["cornerRadius"] = tri.getCornerRadius();
        }
        else if(shape instanceof Square) {
            let sqr = shape as Square;
            this.json["id"] = sqr.getId();
            this.json["length"] = sqr.getLength();
            this.json["cornerRadius"] = sqr.getCornerRadius();
        }
        else if(shape instanceof Ellipse) {
            let elli = shape as Ellipse;
            this.json["id"] = elli.getId();
            this.json["width"] = elli.getWidth();
            this.json["height"] = elli.getHieght();
        }
        else if(shape instanceof Line) {
            let line = shape as Line;
            this.json["id"] = line.getId();
            this.json["endX"] = line.getEndX();
            this.json["endY"] = line.getEndY();
        }
        else if(shape instanceof Circle) {
            let circ = shape as Circle;
            this.json["id"] = circ.getId();
            this.json["radius"] = circ.getRadius();
        }
        else if(shape instanceof Pen) {
            let pen = shape as Pen;
            this.json["id"] = pen.getId();
            this.json["points"] = pen.getPoints();
        }
        console.log(this.json);
        return this.json;
    }
}
