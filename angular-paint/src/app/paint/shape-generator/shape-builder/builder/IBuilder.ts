import Konva from "konva";
import { AbstractShape } from "../../../shape-model/shape-model";

export interface IBuilder {

  getKonvaShape(): Konva.Shape;

  getShape(): AbstractShape;

}
