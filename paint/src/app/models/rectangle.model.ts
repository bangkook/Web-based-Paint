import { Shape } from './shape.model';

export class Rectangle extends Shape{
    length : number;
    width : number;

    constructor(x: number, y : number, color : string, id : number, length : number, width : number){
        super(x, y, color, id, "rectangle");
        this.length = length;
        this.width = width;
    }
}