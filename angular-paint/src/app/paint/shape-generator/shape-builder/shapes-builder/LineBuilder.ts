import { Line } from "../../../shape-model/shapes/line-model";
import { IBuilder } from "../builder/IBuilder";
import Konva from "konva";
import { ShapeAttr } from "../../../shape-model/shape-attributes";
import { AbstractShape } from "../../../shape-model/shape-model";
import { ShapeFactory } from "../../shape-factory/ShapeFactory";
import { KonvaFactory } from "../../konva-factory/KonvaFactory";

export class LineBuilder implements IBuilder {
  private line: Line;
  private konva: Konva.Line = new Konva.Line();
  private shapeFactory: ShapeFactory = new ShapeFactory();
  private konvaFactory: KonvaFactory = new KonvaFactory(this.konva);

  constructor(shapeAttr: ShapeAttr, endX: number, endY: number) {
    this.konva = this.konvaFactory.getKonvaLine(shapeAttr, endX, endY);
    this.line = this.shapeFactory.getLine(this.konva._id, shapeAttr, endX, endY);
  }

  getShape(): AbstractShape { return this.line; }

  getKonvaShape(): Konva.Line { return this.konva; }
}
