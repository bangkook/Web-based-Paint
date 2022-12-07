import { Shape } from './shape.model';

export class Ellipse extends Shape{
    width : number;
    height : number;

    constructor(x: number, y : number, color : string, id : number, width : number, height : number){
        super(x, y, color, id, "ellipse");
        this.width = width;
        this.height = height;
    }
}