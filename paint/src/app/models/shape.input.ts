export class ShapeInput {
    public type : string | undefined;
    public startX : number | undefined;
    public startY : number | undefined;
    public endX : number | undefined;
    public endY : number | undefined;
    public length : number | undefined;
    public width : number | undefined;
    public height : number | undefined;
    public radius : number | undefined;

    constructor(){
    }

    setCircle(x : number, y : number, r : number){
        this.type = "circle";
        this.startX = x;
        this.startY = y;
        this.radius = r;
    }

    setLine(x1 : number, y1 : number, x2 : number, y2 : number){
        this.type = "line";
        this.startX = x1;
        this.startY = y1;
        this.endX = x2;
        this.endY = y2;
    }

    setSquare(x : number, y : number, l : number){
        this.type = "square";
        this.startX = x;
        this.startY = y;
        this.length = l;
    }

    setRectangle(x : number, y : number, l : number, w : number){
        this.type = "rectangle";
        this.startX = x;
        this.startY = y;
        this.length = l;
        this.width = w;
    }

    setEllipse(x : number, y : number, w : number, h : number){
        this.type = "ellipse";
        this.startX = x;
        this.startY = y;
        this.width = w;
        this.height = h;
    }

    setTriangle(x : number, y : number, w : number, h : number){
        this.type = "triangle";
        this.startX = x;
        this.startY = y;
        this.width = w;
        this.height = h;
    }
}