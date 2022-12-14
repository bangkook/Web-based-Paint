import { CloneManager } from './shape-generator/shape-copy/CloneManager';
import { Component, OnInit , HostListener} from '@angular/core';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { Line } from 'konva/lib/shapes/Line';
import { Stage } from 'konva/lib/Stage';
import { PaintService } from './services/HttpService';
import { ShapeBuilder } from './shape-generator/shape-builder/builder/ShapeBuilder';
import { ShapeAttr } from './shape-model/shape-attributes';
import { AbstractShape } from './shape-model/shape-model';
import { TriangleBuilder } from './shape-generator/shape-builder/shapes-builder/TriangleBuilder';
import { EllipseBuilder } from './shape-generator/shape-builder/shapes-builder/EllipseBuilder';
import { SquareBuilder } from './shape-generator/shape-builder/shapes-builder/SquareBuilder';
import { CircleBuilder } from './shape-generator/shape-builder/shapes-builder/CircleBuilder';
import { RectangleBuilder } from './shape-generator/shape-builder/shapes-builder/RectangleBuilder';
import { Shape, ShapeConfig } from 'konva/lib/Shape';
import { Update } from './services/UpdateService';
import { ConversionService } from './services/conversion.service';
import { ShapeDataService } from './services/ShapeDataService';
import { IBuilder } from './shape-generator/shape-builder/builder/IBuilder';
import { Point } from './shape-model/shapes/point-model';
import { LineBuilder } from './shape-generator/shape-builder/shapes-builder/LineBuilder';
import { FreeHandBuilder } from './shape-generator/shape-builder/shapes-builder/FreeHandBuilder';
import { Pen } from './shape-model/shapes/pen-model';
@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.css'],

})
export class PaintComponent implements OnInit {
  shapeBuilder: ShapeBuilder = new ShapeBuilder();
  cloneM : CloneManager = new CloneManager();
  attr: ShapeAttr = new ShapeAttr();
  selectedColor:string="black";
  selectedTool :string= "brush";
  stage!: Stage;
  selectedShape : boolean= false;
  disable : boolean = true;
  layer!: Layer;
  isdraw: boolean =false;
  x:number|any=0;
  y:number|any=0;
  xx:number|any=0;
  yy:number|any=0;
  brushWidth:number=5;
  move:boolean=false;
  trans:boolean=false;
  konva: Konva.Shape|any
  eventListeners: any;
  shapes: Map<number, AbstractShape> = new Map<number, AbstractShape>();
  tr: Konva.Transformer = new Konva.Transformer();
  copiedShape : AbstractShape | any;
  id: number = 0;
  text="text box";
  count: number = 0;
  image: any;

  constructor(public paintService : PaintService, private update: Update, private convert: ConversionService, private data: ShapeDataService) {}
  ngOnInit(): void {
    this.stage = new Stage({
      container: "drawing-board",
      width: window.innerWidth,
      height:  window.innerHeight
    });
    let canvas = document.createElement('canvas');
      canvas.width = this.stage.width();
      canvas.height = this.stage.height();
    this.image = new Konva.Image({
      image: canvas,
      x: 0,
      y: 0,
      fill:"white",
    });
    this.layer = new Layer();
    this.layer.add(this.image);
    this.stage.add(this.layer);
    const sizeSlider = document.querySelector("#size-slider") as HTMLInputElement
    sizeSlider?.addEventListener("change", () => this.brushWidth = parseFloat(sizeSlider.value) );
    const ColorBtns = document.querySelectorAll(".colors .option");
    ColorBtns.forEach(btn => {
    btn.addEventListener("click",()=>{
    document.querySelector(".options .selected")?.classList.remove("selected");
    btn.classList.add("selected");
    this.selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    });},false);

    const colorPicker = document.querySelector("#color-picker")as HTMLInputElement;
    colorPicker.addEventListener("change", () => {
      if(colorPicker.parentElement!=null)
        this.selectedColor = colorPicker.value;
      if(colorPicker.parentElement!=null)
        colorPicker.parentElement.click();
    })

    const toolBtns = document.querySelectorAll(".tool");
    toolBtns.forEach(btn => {
      btn.addEventListener("click", () => { // adding click event to all tool option
          // removing active class from the previous option and adding on current clicked option
        document.querySelector(".options .active")?.classList.remove("active");
        document.querySelector(".tools .active")?.classList.remove("active");
        document.querySelector(".image .active")?.classList.remove("active");
        document.querySelector(".saving .active")?.classList.remove("active");
        btn.classList.add("active");
        this.selectedTool = btn.id;
        console.log(this.selectedTool)
        if(this.selectedTool=="Rectangle") {
          this.text="click and drag to draw Rectangle";
          this.drawRectangle();
        } else if(this.selectedTool=="resize") {
          this.text="choose shape to resize";
          this.resize();
        } else if(this.selectedTool=="Square") {
          this.text="click and drag to draw Square";
          this.drawSquare();
        } else if(this.selectedTool=="Circle") {
          this.text="click and drag to draw Circle";
          this.drawCircle();
        } else if(this.selectedTool=="Ellipse") {
          this.text="click and drag to draw Ellipse";
          this.drawEllipse();
        } else if(this.selectedTool=="Line") {
          this.text="click and drag to draw Line";
          this.drawLine();
        } else if(this.selectedTool=="Triangle") {
          this.text="click and drag to draw Triangle";
          this.drawTriangle();
        } else if(this.selectedTool=="brush"||this.selectedTool=="eraser"){
          if(this.selectedTool=="brush"){this.text="click and drag to draw";}
          if(this.selectedTool=="eraser"){this.text="click and drag to erase";}
          this.freehand();
        } else if(this.selectedTool=="move") {
          this.text="choose shape to move";
          this.moveing();
        } else if(this.selectedTool=="delete") {
          this.text="choose shape to delete";
          this.delete();
        } else if(this.selectedTool=="ClearAll") {
          this.text="choose shape to Clear all";
          this.ClearAll();
        } else if(this.selectedTool=="fill") {
          this.text="select color and click anywhere";
          this.fill();
        } else if(this.selectedTool=="saveimage") {
          this.text="Save image";
          this.saveImage();
        } else if(this.selectedTool=="rotate") {
          this.text="choose shape to rotate";
          this.rotate();
        } else if(this.selectedTool=="mirror") {
          this.text="choose shape to mirror";
          this.mirror();
        } else if(this.selectedTool=="copy") {
          this.text="choose shape to copy";
          this.copy();
        } else if(this.selectedTool=="paste") {
          this.text="choose place to paste";
          this.paste();
        } else if(this.selectedTool=="save") {
          this.text="choose place to save";
          this.save();
        } else if(this.selectedTool=="load") {
          this.text="load existing drawing";
          this.load();
        } else if(this.selectedTool=="undo") {
          this.text="Undo";
          this.undo();
        } else if(this.selectedTool=="redo") {
          this.text="Redo";
          this.redo();
        } 
        else if(this.selectedTool=="mouse") {
          this.mouse();
        }else{
          this.text="";
        }
      });
    });
  }
mouse(){
  if(this.selectedTool=="mouse"){
    this.text='mouse'
    this.selectedTool=""
  }
}
  @HostListener('window:keydown.Control.z', ['$event']) cz() {
    this.undo();
  }


  @HostListener('window:keydown.Control.Shift.z', ['$event']) csz() {
    this.redo();
  }

  @HostListener('window:keyup.Control.c', ['$event']) cc() {
    console.log("pressed c");
    this.selectedTool = "copy";
    this.copy();
  }

  @HostListener('window:keyup.Control.v', ['$event']) cv() {
    console.log("pressed v");
    this.selectedTool = "paste";
    this.paste();
  }

  @HostListener('window:keyup.Control.s', ['$event']) cs() {
    console.log("pressed s");
    this.selectedTool = "save";
    this.save();
  }

  freehand(){
    let p = new Array();
    let pen: FreeHandBuilder, shape: AbstractShape, draw: Pen;
    let index=0;
    if(this.selectedTool=="brush"||this.selectedTool=="eraser"){
      let isPaint = false;
      let mode = this.selectedTool;
      let lastLine: Line<{
        stroke: string; strokeWidth: number; globalCompositeOperation: "source-over" | "destination-out";
        lineJoin: "round";
        points: never[];}>;
      this.stage.on('mousedown touchstart', (e)=> {
        if(this.selectedTool=="brush"||this.selectedTool=="eraser"){
        isPaint = true;
        let Color:string;
        if(this.selectedTool==="eraser"){Color="white";}
        else{Color=this.selectedColor;}
        let pos = this.stage.getRelativePointerPosition();
        this.x = this.stage?.getRelativePointerPosition()?.x;
        this.y = this.stage?.getRelativePointerPosition()?.y;
        this.shapeBuilder.buildDetailedAttr(this.x, this.y, 1, this.selectedColor, this.brushWidth, "rgb(0,0,0,0)", 0);
        this.attr = this.shapeBuilder.getShapeAttr();
        pen = this.shapeBuilder.buildFreeHand(p);
        shape = pen.getShape();
        draw = shape as Pen;
        lastLine = new Konva.Line({
          stroke:  Color ,
          fill:  Color ,
          strokeWidth: this.brushWidth,
          globalCompositeOperation:
          mode === 'brush' ? 'source-over' : 'destination-out' ,
          lineCap: 'round',
          lineJoin: 'round',
          points: [],
          draggable: false,
          name:"pen",});}});
      this.stage.on('mouseup touchend', ()=> {
        if(this.selectedTool=="brush"||this.selectedTool=="eraser"){
        isPaint = false; }});
      this.stage.on('mousemove touchmove', (e)=> {
        if(this.selectedTool=="brush"||this.selectedTool=="eraser"){
        if (!isPaint) { return; }
        e.evt.preventDefault();
        const pos = this.stage.getRelativePointerPosition();
        let newPoints = lastLine.points().concat([pos.x, pos.y]);
        p.push(pos.x);
        p.push(pos.y);
        this.layer.add(lastLine);
        this.konva = lastLine;
        lastLine.points(newPoints);}
      });
      this.stage.on('mouseup', (e:any) => {
        draw.setPoints(p);
        this.shapes.set(draw.getId(), draw);
        console.log(draw);
        this.paintService.addNewShape(this.data.formShapeData(draw)).subscribe();
      })
    }}

  drawRectangle() {///////////////////////////////\
      let rect: RectangleBuilder, shape: AbstractShape;
      this.stage.on("mousedown",() => {
        if(this.selectedTool === "Rectangle") {
          this.move = false
          this.isdraw = true;
          this.trans = false
          this.x = this.stage?.getRelativePointerPosition()?.x;
          this.y = this.stage?.getRelativePointerPosition()?.y;
          this.shapeBuilder.buildDetailedAttr(this.x, this.y, 1, this.selectedColor, this.brushWidth, "rgb(0,0,0,0)", 0);
          this.attr = this.shapeBuilder.getShapeAttr();
          rect = this.shapeBuilder.buildRectangle(0, 0, 0);
          this.konva = rect.getKonvaShape();
          this.layer.add(this.konva).batchDraw();
        }
      });

      this.stage.on("mousemove", () => {
        if(this.selectedTool === "Rectangle") {
          this.move = true;
          this.trans = false
          if(!this.isdraw) { return; }
          this.xx = this.stage?.getRelativePointerPosition()?.x;
          this.yy = this.stage?.getRelativePointerPosition()?.y;
          this.konva.setAttrs({
            width: this.xx - this.x,
            height: this.yy - this.y,
          });
        }
      });

      this.stage.on("mouseup", () => {
        if(this.selectedTool === "Rectangle") {
          this.isdraw = false;
          if(this.move) {
            shape = this.convert.konvaToShape(this.konva);
            this.shapes.set(shape.getId(), shape);
            console.log(shape.getId());
            this.paintService.addNewShape(this.data.formShapeData(shape)).subscribe();
          }
          this.konva = null;
        }
      });
    }

    drawCircle() {///////////////////////////////\
      let circle: CircleBuilder, shape: AbstractShape;
      let r:number|any;
      this.stage.on("mousedown",() => {
        if(this.selectedTool === "Circle") {
          this.move = false
          this.isdraw = true;
          this.trans = false
          this.x = this.stage?.getRelativePointerPosition()?.x;
          this.y = this.stage?.getRelativePointerPosition()?.y;
          console.log(this.stage?.getRelativePointerPosition()?.x)
          this.shapeBuilder.buildDetailedAttr(this.x, this.y, 1, this.selectedColor, this.brushWidth, "rgb(0,0,0,0)", 0);
          this.attr = this.shapeBuilder.getShapeAttr();
          circle = this.shapeBuilder.buildCircl(0);
          this.konva = circle.getKonvaShape();
          this.layer.add(this.konva).batchDraw();
        }
      });

      this.stage.on("mousemove", () => {
        if(this.selectedTool === "Circle") {
          this.move = true;
          this.trans = false
          if(!this.isdraw) { return; }
          this.xx = this.stage?.getRelativePointerPosition()?.x;
          this.yy = this.stage?.getRelativePointerPosition()?.y;
          let a=Math.pow(this.xx-this.x,2)
          let b=Math.pow(this.yy-this.y,2)
          r=Math.sqrt(a+b)
          this.konva.setAttrs({
            radius: r,
          });
        }
      });

      this.stage.on("mouseup", () => {
        if(this.selectedTool ==="Circle") {
          this.isdraw = false;
          if(this.move) {
            shape = this.convert.konvaToShape(this.konva);
            this.shapes.set(shape.getId(), shape);
            let data = this.data.formShapeData(shape);
            this.paintService.addNewShape(data).subscribe();
          }
          this.konva=null;
        }
      });
    }

    drawSquare() {///////////////////////////////\
      let square: SquareBuilder, shape: AbstractShape;
      this.stage.on("mousedown",() => {
        if(this.selectedTool === "Square") {
          this.move = false
          this.isdraw = true;
          this.trans = false
          this.x = this.stage?.getRelativePointerPosition()?.x;
          this.y = this.stage?.getRelativePointerPosition()?.y;
          console.log(this.stage?.getRelativePointerPosition()?.x)
          this.shapeBuilder.buildDetailedAttr(this.x, this.y, 1, this.selectedColor, this.brushWidth, "rgb(0,0,0,0)", 0);
          this.attr = this.shapeBuilder.getShapeAttr();
          square = this.shapeBuilder.buildSquare(0, 0);
          this.konva = square.getKonvaShape();
          this.layer.add(this.konva).batchDraw();
        }
      });

      this.stage.on("mousemove", () => {
        if(this.selectedTool === "Square") {
          this.move = true;
          this.trans = false
          if(!this.isdraw) { return; }
          this.xx = this.stage?.getRelativePointerPosition()?.x;
          this.yy = this.stage?.getRelativePointerPosition()?.y;
          this.konva.setAttrs({
            width: this.xx-this.x,
            height:  this.xx-this.x,
          });
        }
      });

      this.stage.on("mouseup", () => {
        if(this.selectedTool === "Square") {
          this.isdraw = false;
          if(this.move) {
            shape = this.convert.konvaToShape(this.konva);
            this.shapes.set(shape.getId(), shape);
            console.log(shape);
            console.log(this.data.formShapeData(shape));
            this.paintService.addNewShape(this.data.formShapeData(shape)).subscribe();
          }
          this.konva=null;
        }
      });
    }

    drawEllipse() {///////////////////////////////\
      let elli: EllipseBuilder, shape: AbstractShape;
      let width:number|any,height:number|any;
      this.stage.on("mousedown",() => {
        if(this.selectedTool === "Ellipse") {
          this.move = false
          this.isdraw = true;
          this.trans = false
          this.x = this.stage?.getRelativePointerPosition()?.x;
          this.y = this.stage?.getRelativePointerPosition()?.y;
          console.log(this.stage?.getRelativePointerPosition()?.x)
          this.shapeBuilder.buildDetailedAttr(this.x, this.y, 1, this.selectedColor, this.brushWidth, "rgb(0,0,0,0)", 0);
          this.attr = this.shapeBuilder.getShapeAttr();
          elli = this.shapeBuilder.buildEllipse(0, 0);
          this.konva = elli.getKonvaShape();
          this.layer.add(this.konva).batchDraw();
        }
      });

      this.stage.on("mousemove", () => {
        if(this.selectedTool === "Ellipse") {
          this.move = true;
          this.trans = false
          if(!this.isdraw) { return; }
          this.xx = this.stage?.getRelativePointerPosition()?.x;
          this.yy = this.stage?.getRelativePointerPosition()?.y;
          width=Math.abs(this.xx-this.x);
          height=Math.abs(this.yy-this.y);
          this.konva.setAttrs({
            width: width,
            height: height,
          });
        }
      });

      this.stage.on("mouseup", () => {
        if(this.selectedTool === "Ellipse") {
          this.isdraw = false;
          if(this.move) {
            shape = this.convert.konvaToShape(this.konva);
            this.shapes.set(shape.getId(), shape);
            this.paintService.addNewShape(this.data.formShapeData(shape)).subscribe();
          }
          this.konva=null;
        }
      });
    }

    drawLine() {
      let line: LineBuilder, shape: AbstractShape;
      let endX: number | any, endY : number | any;
      this.stage.on('mousedown', () => {
        if(this.selectedTool === "Line") {
          this.move = false
          this.isdraw = true;
          this.trans = false
          this.x = this.stage?.getRelativePointerPosition()?.x;
          this.y = this.stage?.getRelativePointerPosition()?.y;
          const pos = this.stage.getRelativePointerPosition();
          this.konva = new Line({
            points: [this.x, this.y],
            stroke: this.selectedColor, 
            strokeWidth: this.brushWidth
          })
          this.layer.add(this.konva).batchDraw();
        }
      });

      this.stage.on('mousemove', () => {
        if(this.selectedTool === "Line") {
        this.move = true;
        this.trans = false;
        if (!this.isdraw) {return;}
        const pos = this.stage?.getRelativePointerPosition();
        endX = pos?.x, endY = pos?.y;
        this.konva.setAttrs({
          points: [this.x, this.y, pos?.x, pos?.y],
        })
    }});

      this.stage.on('mouseup', () => {
        if(this.selectedTool === "Line") {
          this.isdraw = false;
          if(this.move) {
            this.shapeBuilder.buildDetailedAttr(this.x, this.y, 1, this.selectedColor, this.brushWidth, "rgb(0,0,0,0)", 0);
            this.attr = this.shapeBuilder.getShapeAttr();
            line = this.shapeBuilder.buildLine(endX, endY);
            shape = line.getShape();
            this.konva = line.getKonvaShape();
            this.layer.add(this.konva).batchDraw();
            this.shapes.set(shape.getId(), shape);
            console.log(this.konva.width() + " heyyyyyyyyyyyyyyyyyyy");
            this.paintService.addNewShape(this.data.formShapeData(shape)).subscribe();
          }
        }
        this.konva=null;
    });
  }

  drawTriangle() {
    let triangle: TriangleBuilder, shape: AbstractShape;
    let r:number|any;
    this.stage.on("mousedown",() => {
      if(this.selectedTool === "Triangle") {
        this.move = false
        this.isdraw = true;
        this.trans = false
        this.x = this.stage?.getRelativePointerPosition()?.x;
        this.y = this.stage?.getRelativePointerPosition()?.y;
        this.shapeBuilder.buildDetailedAttr(this.x, this.y, 1, this.selectedColor, this.brushWidth, "rgb(0,0,0,0)", 0);
        this.attr = this.shapeBuilder.getShapeAttr();
        triangle = this.shapeBuilder.buildTriangle(0, 0);
        this.konva = triangle.getKonvaShape();
        this.layer.add(this.konva).batchDraw();
      }
    });

    this.stage.on("mousemove", () => {
      if(this.selectedTool === "Triangle") {
        this.move = true;
        this.trans = false
        if(!this.isdraw) { return; }
        this.xx = this.stage?.getRelativePointerPosition()?.x;
        this.yy = this.stage?.getRelativePointerPosition()?.y;
        let a=Math.pow(this.xx-this.x,2)
        let b=Math.pow(this.yy-this.y,2)
        r=Math.sqrt(a+b)
        this.konva.setAttrs({
          radius: r,
        });
      }
    });

    this.stage.on("mouseup", () => {
      if(this.selectedTool === "Triangle") {
        this.isdraw = false;
        if(this.move) {
          shape = this.convert.konvaToShape(this.konva);
          console.log(shape.getId(), shape.getShapeAttr(), shape.getType());
          this.shapes.set(this.konva._id, shape);
          this.paintService.addNewShape(this.data.formShapeData(shape)).subscribe();
        }
        this.konva=null;
      }
    });
  }

  copy() {
    this.stage.on('click tap',  (e:any) => {
      if(this.selectedTool==="copy") {
        if (e.target != this.stage) { this.copiedShape = this.shapes.get(Number(e.target._id)) }
        console.log("copied!");
        console.log(this.copiedShape);
        console.log(e.target._id);
      }
    });
  }

  paste() {
    if(this.selectedTool==="paste") {
      this.isdraw = true;
      if(this.copiedShape === undefined) return;
      let clonedShapeBuilder = (new CloneManager()).cloneShape(this.copiedShape);
      this.konva = clonedShapeBuilder.getKonvaShape();
      console.log(clonedShapeBuilder.getShape());
      if(this.konva instanceof Konva.Line && this.konva.points().length == 4) {
        this.attr = clonedShapeBuilder.getShape().getShapeAttr();
        this.konva.setAttrs({
          points: [this.konva.points()[0] + 10, this.konva.points()[1] - 10, this.konva.points()[2] + 10, this.konva.points()[3] - 10]
        })
        this.layer.add(this.konva);
        let shape = clonedShapeBuilder.getShape();
        shape = this.convert.konvaToShape(this.konva);
        shape.getShapeAttr().setStartX(this.konva.points()[0]), shape.getShapeAttr().setStartY(this.konva.points()[1]);
        console.log(this.konva.points()[0], this.konva.points()[1]);
        this.shapes.set(shape.getId(), shape);
        this.paintService.addNewShape(this.data.formShapeData(shape)).subscribe();
        return;
      }
      this.xx = this.stage?.getRelativePointerPosition()?.x;
      this.yy = this.stage?.getRelativePointerPosition()?.y;
      this.konva.setAttrs({
        x: this.xx,
        y: this.yy,
        fill:this.copiedShape.shapeAttr.fill,
      });
    

      this.stage.on("mouseup", () => {
        if(this.selectedTool === "paste"){
          this.isdraw = false;
          if(this.move) {
            this.shapeBuilder.buildAttr(this.attr);
            this.shapes.set(clonedShapeBuilder.getShape().getId() ,clonedShapeBuilder.getShape());
            console.log(this.copiedShape.getId(), clonedShapeBuilder.getShape().getId());
            this.paintService.copyShape(this.copiedShape.getId(), clonedShapeBuilder.getShape().getId(), this.konva.x(), this.konva.y()).subscribe();
          }
          this.konva=null;
          console.log("pasted!");
        }}
      );
    }
  }

  resize():void{
    if(this.selectedTool==="resize"){
    var tr = new Konva.Transformer({ ignoreStroke: true, });
    this.layer.add(tr);}
    this.stage.on('mousedown touchstart', (e) => { //make sure i click on shape
      if(this.selectedTool==="resize"){
        if (e.target !== this.stage) { return; }
      }
      else{
        tr.nodes([]);
        return;
      }});

      this.stage.on('mousemove touchmove', () => {
        if(this.selectedTool!="resize"){tr.nodes([]);  return;}});

      this.stage.on('click tap',  (e) => {
        if(this.selectedTool==="resize") {
          if (e.target === this.stage) {tr.nodes([]); return;} //if click on stage not konva shape then return
          else {
            console.log(e.target);
            console.log("name: " + e.target.constructor.name);
            if(e.target.constructor.name=="Rect"){
              tr.nodes([e.target]).on('transform', () => { //
                e.target.setAttrs({
                  width: Math.max(tr.nodes([e.target]).width() * tr.nodes([e.target]).scaleX(), 5),
                  height: Math.max(tr.nodes([e.target]).height() * tr.nodes([e.target]).scaleY(), 5),
                  scaleX: 1,
                  scaleY: 1,
                });
                let shape = this.convert.konvaToShape(e.target as Shape<ShapeConfig>);
                this.shapes.set(e.target._id, shape);
              });
              // console.log(e.target.attrs.height);
            }
            else if(e.target.constructor.name=="Circle"){
              tr.setAttrs({
                enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
              });
              tr.nodes([e.target]).on('transform', () => { //
                e.target.setAttrs({
                  radius: Math.max(((tr.nodes([e.target]).width()* tr.nodes([e.target]).scaleX() )+ (tr.nodes([e.target]).height()* tr.nodes([e.target]).scaleY() ))/4, 5),
                  scaleX: 1,
                  scaleY: 1,
              });
            let shape = this.convert.konvaToShape(e.target as Shape<ShapeConfig>);
            this.shapes.set(e.target._id, shape);
            // console.log(e.target.attrs.radius);
          });
        }
        else if(e.target.constructor.name=="Ellipse"){
          tr.nodes([e.target]).on('transform', () => { //
            e.target.setAttrs({
              radiusX: Math.max(tr.nodes([e.target]).width() * tr.nodes([e.target]).scaleX()/2, 5),
              radiusY: Math.max(tr.nodes([e.target]).height() * tr.nodes([e.target]).scaleY()/2, 5),
              scaleX: 1,
              scaleY: 1,
            });
            let shape = this.convert.konvaToShape(e.target as Shape<ShapeConfig>);
            this.shapes.set(e.target._id, shape);
            // console.log(e.target.attrs.radiusX+" "+e.target.attrs.radiusY);
          });
        }
        else if(e.target.constructor.name=="RegularPolygon"){
          tr.setAttrs({
            enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right','top-center','bottom-center'],
          });
          tr.nodes([e.target]).on('transform', () => { //
            e.target.setAttrs({
              radius: Math.max(( (tr.nodes([e.target]).height()* tr.nodes([e.target]).scaleY() ))*(2/3), 5),
              scaleY: 1,
            });
            let shape = this.convert.konvaToShape(e.target as Shape<ShapeConfig>);
            this.shapes.set(e.target._id, shape);
            console.log(tr._nodes);
            // console.log(e.target.attrs.radius);
          });
        }
      } //else put in the nodes the selected konva shape
    }
    else{
      tr.nodes([]);
      return;
    }
    this.konva = e.target;
    });
    this.stage.on('mouseup', (e:any) => {
      if (e.target != this.stage&& e.target.name()!="pen") {
        console.log(e.target._id);
        this.shapes.set(e.target._id, this.update.update(e.target, this.paintService));
      }
    })
  }

  moveing() {
    this.stage.on('mousemove touchmove',  (e:any) => {
      if(this.selectedTool==="move") {
        if (e.target != this.stage&& e.target.name()!="pen") {
          e.target.to({
            draggable:true,
          });
        }
      }
      else  {
        e.target.to({ draggable:false, });
      }
    });
    this.stage.on('mouseup', (e:any) => {
      if (e.target != this.stage&& e.target.name()!="pen"&&this.selectedTool==="move") {
        this.shapes.set(e.target._id, this.update.update(e.target, this.paintService));
      }
    })
  }

  undo() {
    this.paintService.undo().subscribe((res)=>{
      console.log(res);
      let x = JSON.stringify(res);
      console.log(x);
      let y = JSON.parse(x);
      this.stage = new Stage({
        container: "drawing-board",
        width: window.innerWidth,
        height:  window.innerHeight
      });
      this.layer = new Layer();
      this.layer.add(this.image);
      this.stage.add(this.layer);
      this.shapes.clear();

      for(let key in y){
        console.log(key);
        this.loadHandling(y[key]);
      }

      console.log("undo done!");
    })
  }
  redo() {
    this.paintService.redo().subscribe((res)=>{
      console.log(res);

      let x = JSON.stringify(res);
      let y = JSON.parse(x);
      this.stage = new Stage({
        container: "drawing-board",
        width: window.innerWidth,
        height:  window.innerHeight
      });
      this.layer = new Layer();
      this.layer.add(this.image);
      this.stage.add(this.layer);
      this.shapes.clear();

      for(let key in y){
        console.log(key);
        this.loadHandling(y[key]);
      }

      console.log("redo done!");
    })
  }

  delete() {
    this.stage.on('click tap',  (e:any) => {
      if(this.selectedTool==="delete") {
        if (e.target != this.stage) {
          this.paintService.deleteShape(e.target._id).subscribe();
          this.shapes.delete(e.target._id);
          e.target.destroy();
        }
      }
    });
  }

  ClearAll() {
    if (confirm('Are you sure you want to clear all?')) {
      this.layer = new Layer();
      this.layer.add(this.image);
      this.stage.add(this.layer);
      this.paintService.deleteAllShapes().subscribe((res)=>{
        this.shapes.clear();
        console.log(this.shapes);
        console.log("cleared!!");
      });
    }
  }

  saveImage() {
    function downloadURI(uri:any, name:any) {
      var link = document.createElement('a');
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      link.remove();
    }
    var dataURL = this.stage.toDataURL({});
    downloadURI(dataURL, 'stage.png');
    this.paintService.save().subscribe();
  }

  save() { this.paintService.save().subscribe(); }

  load() {

    this.paintService.load().subscribe(res => {
      let x = JSON.stringify(res);
      let y = JSON.parse(x);
      //console.log(x);
      console.log(y);
      this.stage = new Stage({
        container: "drawing-board",
        width: window.innerWidth,
        height:  window.innerHeight
      });
      this.layer = new Layer();
      this.layer.add(this.image);
      this.stage.add(this.layer);
      this.shapes.clear();
      for(let key in y){
        console.log(key);
        this.loadHandling(y[key]);
      }
    });
  }

  loadHandling(y : any){
    console.log(y["type"]);
    this.shapeBuilder.buildDetailedAttr(y.startX, y.startY, y.scaleX, y.stroke, y.strokeWidth, y.fill, y.rotation);
    let builder : IBuilder;
    if(y.type == "circle"){
      builder = this.shapeBuilder.buildCircl(y.radius);
    }
    else if(y.type == "ellipse"){
      builder = this.shapeBuilder.buildEllipse(y.width, y.height);
    }
    else if(y.type == "square"){
      builder = this.shapeBuilder.buildSquare(y.length, y.cornerRadius);
    }
    else if(y.type == "rectangle"){
      builder = this.shapeBuilder.buildRectangle(y.width, y.length, y.cornerRadius);
    }
    else if(y.type == "line"){
      //this.shapeBuilder.getShapeAttr().setStartX(undefined);

      builder = this.shapeBuilder.buildLine(y.endX, y.endY);
    }
    else if(y.type == "triangle"){
      builder = this.shapeBuilder.buildTriangle(y.radius, y.cornerRadius);
    }
    else{
      builder = this.shapeBuilder.buildFreeHand(y.points);
    }

    console.log(y.points);
    this.konva = builder.getKonvaShape();
    let shape = builder.getShape();
    console.log(this.layer._id);
    builder.getKonvaShape()._id = y.id;
    builder.getShape().setId(y.id);
    console.log(shape);
    console.log(this.konva);

    this.layer.add(this.konva).batchDraw();
    this.shapes.set(y.id, shape);
  }

  fill(){
    this.stage.on('click tap',  (e:any) => {
      if(this.selectedTool==="fill" && e.target.constructor.name != "Line"){
        if (e.target != this.stage) {
          e.target.setAttrs({
            fill:this.selectedColor,
          });
          console.log(e.target)
        }
        else if(e.target === this.stage){
          this.stage.container().style.backgroundColor=this.selectedColor;
        }
        else{
          e.target.to({
            fill:false,
          });
        }
      }
    });
    this.stage.on('mouseup', (e:any) => {
      if (e.target != this.stage&& e.target.name()!="pen"&&this.selectedTool==="fill") {
        e.target.setAttrs({
          fill:this.selectedColor,
        });
        this.shapes.set(e.target._id, this.update.update(e.target, this.paintService));
      }
    })
  }

  rotate(){
    this.stage.on('click tap',  (e:any) => {
      if(this.selectedTool==="rotate") {
        if (e.target != this.stage && e.target.constructor.name != "Line") {
          e.target.setAttrs({
            rotation: (e.target.attrs.rotation + 90) % 360,
          });
          let shape = this.convert.konvaToShape(e.target as Shape<ShapeConfig>);
          this.shapes.set(e.target._id, shape);
          console.log(e.target.attrs.rotation);
          this.shapes.set(e.target._id, this.update.update(e.target, this.paintService));
        }
      }
    });
  }

  mirror() {
    this.stage.on('click tap',  (e:any) => {
      if(this.selectedTool==="mirror"  && e.target.constructor.name != "Line"){
        if (e.target != this.stage) {
          console.log(e.target)
          e.target.setAttrs({
            scaleX: -e.target.scaleX(),
          });
          let shape = this.convert.konvaToShape(e.target as Shape<ShapeConfig>);
          this.shapes.set(e.target._id, shape);
          this.shapes.set(e.target._id, this.update.update(e.target, this.paintService));
        }
      }
    });
    this.stage.on('mouseup', (e:any) => {
      if (e.target != this.stage&& e.target.name()!="pen"&&this.selectedTool==="mirror") {
        e.target.setAttrs({
          scaleX: e.target.scaleX(),
        });
        this.shapes.set(e.target._id, this.update.update(e.target, this.paintService));
      }
    });
  }
}
