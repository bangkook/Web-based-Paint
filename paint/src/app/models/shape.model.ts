import { Point } from "./point.model";

export class Shape{
    public color: string;
    public startPoint: Point;
    public id: number;
    public type: string;

    constructor(x: number, y : number, color : string, id : number, type : string){
        this.startPoint = new Point(x, y);
        this.color = color;
        this.id = id;
        this.type = type;
    }
}
