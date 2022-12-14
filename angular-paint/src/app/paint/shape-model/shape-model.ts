import { ShapeAttr } from "./shape-attributes";


//object for common attributes
export abstract class AbstractShape {

    private shapeAttr: ShapeAttr ;
    public id : number;
    private type : string;

    constructor(id : number, type : string, shapeAttr: ShapeAttr) {
      this.id = id;
      this.type = type;
      this.shapeAttr = shapeAttr;
    }

    getId(): number { return this.id; }

    getType(): string { return this.type; }

    setId(id: number): void { this.id = id; }

    setType(type: string): void { this.type = type; }
    
    getShapeAttr(): ShapeAttr { return this.shapeAttr; }

    setShapeAttr(shapeAttr: ShapeAttr): void { this.shapeAttr = shapeAttr; }

}
