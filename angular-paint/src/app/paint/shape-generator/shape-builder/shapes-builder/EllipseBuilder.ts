import { IBuilder } from "../builder/IBuilder";
import Konva from "konva";
import { ShapeAttr } from "../../../shape-model/shape-attributes";
import { Ellipse } from "../../../shape-model/shapes/ellipse-model";
import { AbstractShape } from "../../../shape-model/shape-model";
import { ShapeFactory } from "../../shape-factory/ShapeFactory";
import { KonvaFactory } from "../../konva-factory/KonvaFactory";

export class EllipseBuilder implements IBuilder{
  private ellipse: Ellipse;
  private konva: Konva.Ellipse = new Konva.Ellipse();
  private shapeFactory: ShapeFactory = new ShapeFactory();
  private konvaFactory: KonvaFactory = new KonvaFactory(this.konva);

  constructor(shapeAttr: ShapeAttr, length: number, height: number) {
    this.konva = this.konvaFactory.getKonvaEllipse(shapeAttr, length, height);
    this.ellipse = this.shapeFactory.getEllipse(this.konva._id, shapeAttr, length, height);
  }

  getShape(): AbstractShape { return this.ellipse; }

  getKonvaShape(): Konva.Shape { return this.konva; }
}
