import { Square } from "../../../shape-model/shapes/square-model";
import { IBuilder } from "../builder/IBuilder";
import Konva from "konva";
import { ShapeAttr } from "../../../shape-model/shape-attributes";
import { AbstractShape } from "../../../shape-model/shape-model";
import { ShapeFactory } from "../../shape-factory/ShapeFactory";
import { KonvaFactory } from "../../konva-factory/KonvaFactory";

export class SquareBuilder implements IBuilder {
  private square: Square;
  private konva: Konva.Rect = new Konva.Rect();
  private shapeFactory: ShapeFactory = new ShapeFactory();
  private konvaFactory: KonvaFactory = new KonvaFactory(this.konva);

  constructor(shapeAttr: ShapeAttr, length: number, cornerRadius: number) {
    this.konva = this.konvaFactory.getKonvaSquare(shapeAttr, length, cornerRadius);
    this.square = this.shapeFactory.getSquare(this.konva._id, shapeAttr, length, cornerRadius);
  }

  private buildKonva(shapeAttr: ShapeAttr, length: number, cornerRadius: number): void {
    this.konva.setAttrs({
        x: shapeAttr.getStartX(),
        y: shapeAttr.getStartY(),
        fill: shapeAttr.getFill(),
        stroke: shapeAttr.getStroke(),
        strokeWidth: shapeAttr.getStrokeWidth(),
        width: length,
        height: length,
        cornerRadius: cornerRadius,
        rotation: shapeAttr.getRotation(),
        draggable: true,
        listening: true,
        visible: true
    })
  }


  getShape(): AbstractShape { return this.square; }

  getKonvaShape(): Konva.Shape { return this.konva; }
}
