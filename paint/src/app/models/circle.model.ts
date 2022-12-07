import { Shape } from './shape.model';

export class Circle extends Shape{
    public radius: number;

    constructor(x: number, y : number, color : string, id : number, radius : number){
        super(x, y, color, id, "circle");
        this.radius = radius;
    }
}