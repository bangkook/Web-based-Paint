import Konva from "konva";
import { ShapeAttr } from "../paint/shape-model/shape-attributes";
import { Circle } from "../paint/shape-model/shapes/circle-model";
import { Ellipse } from "../paint/shape-model/shapes/ellipse-model";
import { Line } from "../paint/shape-model/shapes/line-model";
import { Rectangle } from "../paint/shape-model/shapes/rectangle-model";
import { ShapeData } from "../paint/shape-model/shapes/ShapeData";
import { Square } from "../paint/shape-model/shapes/square-model";
import { Triangle } from "../paint/shape-model/shapes/triangle-model";



export class KonvaFactory {

    private konva: Konva.Shape = new Konva.Shape;

    getShape(shapeData: ShapeData): Konva.Shape{
      let shapeAttr = new ShapeAttr(shapeData.x, shapeData.y, shapeData.stroke, shapeData.strokeWidth, shapeData.fill, shapeData.rotation, shapeData.scaleX)
      if(shapeData.type == 'triangle') {
        let triangle = new Triangle(shapeData.id, shapeAttr, shapeData.radius)
        return triangle.getShape(shapeData)
      } else if(shapeData.type == 'square') {
        let square = new Square(shapeData.id, shapeAttr, shapeData.length, shapeData.cornerRadius)
        return square.getShape(shapeData)
      } else if(shapeData.type == 'rectangle') {
        let rectangle = new Rectangle(shapeData.id, shapeAttr, shapeData.width, shapeData.length, shapeData.cornerRadius)
        return rectangle.getShape(shapeData)
      } else if(shapeData.type == 'ellipse') {
        let ellipse = new Ellipse(shapeData.id, shapeAttr, shapeData.width, shapeData.height)
        return ellipse.getShape(shapeData)
      } else if(shapeData.type == 'circle') {
        let circle = new Circle(shapeData.id, shapeAttr, shapeData.radius)
        return circle.getShape(shapeData)
      } else if(shapeData.type == 'line') {
        let line = new Line(shapeData.id, shapeAttr, shapeData.endX, shapeData.endY)
        return line.getShape(shapeData)
      }
      return this.konva
    }
}
