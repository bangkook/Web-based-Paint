import { Rectangle } from "../../../shape-model/shapes/rectangle-model";
import { IBuilder } from "../builder/IBuilder";
import Konva from "konva";
import { ShapeAttr } from "../../../shape-model/shape-attributes";
import { AbstractShape } from "../../../shape-model/shape-model";
import { ShapeFactory } from "../../shape-factory/ShapeFactory";
import { KonvaFactory } from "../../konva-factory/KonvaFactory";

export class RectangleBuilder implements IBuilder {
  private rectangle: Rectangle;
  private konva: Konva.Rect = new Konva.Rect();
  private shapeFactory: ShapeFactory = new ShapeFactory();
  private konvaFactory: KonvaFactory = new KonvaFactory(this.konva);

  constructor(shapeAttr: ShapeAttr, width: number, length: number, cornerRadius: number) {
    this.konva = this.konvaFactory.getKonvaRectangle(shapeAttr, width, length, cornerRadius);
    this.rectangle = this.shapeFactory.getRectangle(this.konva._id, shapeAttr, width, length, cornerRadius);
  }

  getKonvaShape(): Konva.Shape { return this.konva; }//draw konva

  getShape(): AbstractShape { return this.rectangle; }//back
}
