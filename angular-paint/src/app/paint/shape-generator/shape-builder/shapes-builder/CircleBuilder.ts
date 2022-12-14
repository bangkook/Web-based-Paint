import { IBuilder } from "../builder/IBuilder";
import Konva from "konva";
import { ShapeAttr } from "../../../shape-model/shape-attributes";
import { Circle } from "../../../shape-model/shapes/circle-model";
import { AbstractShape } from "../../../shape-model/shape-model";
import { ShapeFactory } from "../../shape-factory/ShapeFactory";
import { KonvaFactory } from "../../konva-factory/KonvaFactory";

export class CircleBuilder implements IBuilder{
  private circle: Circle;
  private konva: Konva.Circle = new Konva.Circle();
  private shapeFactory: ShapeFactory = new ShapeFactory();
  private konvaFactory: KonvaFactory = new KonvaFactory(this.konva);

  constructor(shapeAttr: ShapeAttr, raduis: number) {
    this.konva = this.konvaFactory.getKonvaCircle(shapeAttr, raduis);
    this.circle = this.shapeFactory.getCircle(this.konva._id, shapeAttr, raduis);
  }

  getShape(): AbstractShape { return this.circle; }

  getKonvaShape(): Konva.Shape { return this.konva; }
}
