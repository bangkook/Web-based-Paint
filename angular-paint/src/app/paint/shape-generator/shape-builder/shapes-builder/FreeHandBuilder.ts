import Konva from "konva";
import { ShapeAttr } from "src/app/paint/shape-model/shape-attributes";
import { AbstractShape } from "src/app/paint/shape-model/shape-model";
import { Pen } from "src/app/paint/shape-model/shapes/pen-model";
import { KonvaFactory } from "../../konva-factory/KonvaFactory";
import { ShapeFactory } from "../../shape-factory/ShapeFactory";
import { IBuilder } from "../builder/IBuilder";

export class FreeHandBuilder implements IBuilder{
  private pen: Pen;
  private konva: Konva.Line = new Konva.Line();
  private shapeFactory: ShapeFactory = new ShapeFactory();
  private konvaFactory: KonvaFactory = new KonvaFactory(this.konva);

  constructor(shapeAttr: ShapeAttr, points: number[]) {
    this.konva = this.konvaFactory.getFreeHand(shapeAttr, points);
    this.pen = this.shapeFactory.getFreeHand(this.konva._id, shapeAttr, points);
  }

  getShape(): AbstractShape { return this.pen; }

  getKonvaShape(): Konva.Shape { return this.konva; }

}
