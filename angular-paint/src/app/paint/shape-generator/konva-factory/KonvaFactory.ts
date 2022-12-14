import Konva from "konva";
import { ShapeAttr } from "../../shape-model/shape-attributes";

export class KonvaFactory {

    private konva: Konva.Shape;

    constructor(konva: Konva.Shape) { this.konva = konva; }

    getKonvaCircle(shapeAttr: ShapeAttr, raduis: number): Konva.Circle {
        let konva = this.konva as Konva.Circle;
        return konva.setAttrs({
            x: shapeAttr.getStartX(),
            y: shapeAttr.getStartY(),
            fill: shapeAttr.getFill(),
            radius: raduis,
            stroke: shapeAttr.getStroke(),
            strokeWidth: shapeAttr.getStrokeWidth(),
            rotation: shapeAttr.getRotation(),
            draggable: false,
            listening: true,
            visible: true
        })
    }

    getKonvaEllipse(shapeAttr: ShapeAttr, length: number, height: number): Konva.Ellipse {
        let konva = this.konva as Konva.Ellipse;
        return konva.setAttrs({
            x: shapeAttr.getStartX(),
            y: shapeAttr.getStartY(),
            stroke: shapeAttr.getStroke(),
            fill: shapeAttr.getFill(),
            strokeWidth: shapeAttr.getStrokeWidth(),
            width: length,
            height: height,
            rotation: shapeAttr.getRotation(),
            draggable: false,
            listening: true,
            visible: true
        });
    }

    getKonvaLine(shapeAttr: ShapeAttr, endX: number, endY: number): Konva.Line {
        let konva = this.konva as Konva.Line;
        return konva.setAttrs({
            points: [shapeAttr.getStartX(), shapeAttr.getStartY(), endX, endY],
            fill: shapeAttr.getFill(),
            stroke: shapeAttr.getStroke(),
            strokeWidth: shapeAttr.getStrokeWidth(),
            draggable: true,
            // rotation: shapeAttr.getRotation(),
            listening: true,
            visible: true
        })
    }

    getKonvaRectangle(shapeAttr: ShapeAttr, width: number, length: number, cornerRadius: number): Konva.Rect {
        let konva = this.konva as Konva.Rect;
        return konva.setAttrs({
            x: shapeAttr.getStartX(),
            y: shapeAttr.getStartY(),
            fill: shapeAttr.getFill(),
            stroke: shapeAttr.getStroke(),
            strokeWidth: shapeAttr.getStrokeWidth(),
            width: length,
            height: width,
            cornerRadius: cornerRadius,
            rotation: shapeAttr.getRotation(),
            draggable: false,
            listening: true,
            visible: true
        })
    }

    getKonvaSquare(shapeAttr: ShapeAttr, length: number, cornerRadius: number): Konva.Rect {
        let konva = this.konva as Konva.Rect;
        return konva.setAttrs({
            x: shapeAttr.getStartX(),
            y: shapeAttr.getStartY(),
            fill: shapeAttr.getFill(),
            stroke: shapeAttr.getStroke(),
            strokeWidth: shapeAttr.getStrokeWidth(),
            width: length,
            height: length,
            cornerRadius: cornerRadius,
            rotation: shapeAttr.getRotation(),
            draggable: false,
            listening: true,
            visible: true
        })
    }

    getKonvaTriangle(shapeAttr: ShapeAttr, radius: number, cornerRadius: number): Konva.RegularPolygon {
        let konva = this.konva as Konva.RegularPolygon;
        return konva.setAttrs({
            x: shapeAttr.getStartX(),
            y: shapeAttr.getStartY(),
            fill: shapeAttr.getFill(),
            stroke: shapeAttr.getStroke(),
            strokeWidth: shapeAttr.getStrokeWidth(),
            radius: radius,
            sides: 3,
            cornerRadius: cornerRadius,
            rotation: shapeAttr.getRotation(),
            draggable: false,
            listening: true,
            visible: true
        })
    }

    getFreeHand(shapeAttr: ShapeAttr, points: number[]): Konva.Line {
        let konva = this.konva as Konva.Line;
        return konva.setAttrs({
            //x: shapeAttr.getStartX(),
            //y : shapeAttr.getStartY(),
            points: points,
            fill: shapeAttr.getFill(),
            stroke: shapeAttr.getStroke(),
            strokeWidth: shapeAttr.getStrokeWidth(),
            draggable: false,
            rotation: shapeAttr.getRotation(),
            listening: true,
            visible: true
        })
    }
}
