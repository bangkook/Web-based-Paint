import { IBuilder } from "../builder/IBuilder";
import Konva from "konva";
import { ShapeAttr } from "../../../shape-model/shape-attributes";
import { AbstractShape } from "../../../shape-model/shape-model";
import { Triangle } from "src/app/paint/shape-model/shapes/triangle-model";
import { ShapeFactory } from "../../shape-factory/ShapeFactory";
import { KonvaFactory } from "../../konva-factory/KonvaFactory";

export class TriangleBuilder implements IBuilder {
  private triangle: Triangle;
  private konva: Konva.RegularPolygon = new Konva.RegularPolygon();
  private shapeFactory: ShapeFactory = new ShapeFactory();
  private konvaFactory: KonvaFactory = new KonvaFactory(this.konva);

  constructor(shapeAttr: ShapeAttr,radius: number, cornerRadius: number) {
    this.konva = this.konvaFactory.getKonvaTriangle(shapeAttr, radius, cornerRadius);
    this.triangle = this.shapeFactory.getTriangle(this.konva._id, shapeAttr, radius, cornerRadius);
  }

  getKonvaShape(): Konva.Shape { return this.konva; }//draw konva

  getShape(): AbstractShape { return this.triangle; }//back
}
