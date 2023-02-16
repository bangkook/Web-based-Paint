export class ShapeAttr {

    private startX : number;
    private startY : number;
    private stroke : string;
    private strokeWidth: number;
    private fill: string | any;
    private rotation: number;
    private scaleX: number;

    constructor(startX: number, startY: number, stroke: string, strokeWidth: number, fill: string, rotation: number, scaleX: number) {
      this.startX = startX;
      this.startY = startY;
      this.stroke = stroke;
      this.strokeWidth = strokeWidth;
      this.fill = fill;
      this.rotation = rotation;
      this.scaleX = scaleX;
    }

    setAttrs(startX: number, startY: number, scaleX: number, stroke: string,
      strokeWidth: number, fill: string, rotation: number) {
        this.startX = startX;
        this.startY = startY;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
        this.fill = fill;
        this.rotation = rotation;
        this.scaleX = scaleX;
      }

    getStartX(): number { return this.startX; }

    getStartY(): number { return this.startY; }

    getStroke(): string { return this.stroke; }

    getStrokeWidth(): number { return this.strokeWidth; }

    getFill(): string { return this.fill; }

    getRotation(): number { return this.rotation; }

    getScaleX(): number { return this.scaleX; }

    setScaleX(scaleX: number): void { this.scaleX = scaleX; }

    setStartX(startX: number): void { this.startX = startX; }

    setStartY(startY: number): void { this.startY = startY; }

    setStroke(stroke: string): void { this.stroke = stroke; }

    setStrokeWidth(strokeWidth: number): void { this.strokeWidth = strokeWidth; }

    setFill(fill: string): void { this.fill = fill; }

    setRotation(rotation: number): void { this.rotation = rotation; }
  }
