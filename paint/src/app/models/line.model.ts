import { Shape } from './shape.model';

export class Line extends Shape{
    endX : number;
    endY : number;

    constructor(x: number, y : number, color : string, id : number, endX : number, endY : number){
        super(x, y, color, id, "line");
        this.endX = endX;
        this.endY = endY;
    }
}