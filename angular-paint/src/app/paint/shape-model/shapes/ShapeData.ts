import { ShapeAttr } from "../shape-attributes";

export class ShapeData {
  public type: string = ''
  public stroke: string = '';
  public fill: string = '';
  public id: number = 0;
  public x: number = 0;
  public y: number = 0;
  public endX: number = 0;
  public endY: number = 0;
  public scaleX: number = 1;
  public length: number = 0;
  public width: number = 0;
  public height: number = 0;
  public radius: number = 0;
  public strokeWidth: number = 0;
  public rotation: number = 0;
  public cornerRadius: number = 0;
  public points: number[] = [];

  constructor();
  constructor(shapeAttr: ShapeAttr);
  constructor(shapeAttr?: ShapeAttr){
    if(shapeAttr) {
      this.x = shapeAttr.getStartX()
      this.y = shapeAttr.getStartY()
      this.stroke = shapeAttr.getStroke()
      this.strokeWidth = shapeAttr.getStrokeWidth()
      this.fill = shapeAttr.getFill()
      this.rotation = shapeAttr.getRotation()
      this.scaleX = shapeAttr.getScaleX()
    }
  }
}
