import { Shape } from './shape.model';

export class Square extends Shape{
    public length : number;

    constructor(x: number, y : number, color : string, id : number, length : number){
        super(x, y, color, id, "square");
        this.length = length;
    }
}