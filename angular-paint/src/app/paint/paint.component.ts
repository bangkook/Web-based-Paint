import { Component, OnInit , HostListener} from '@angular/core';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { Line } from 'konva/lib/shapes/Line';
import { Stage } from 'konva/lib/Stage';
import { ShapeAttr } from './shape-model/shape-attributes';
import { AbstractShape } from './shape-model/shape-model';
import { ShapeData } from './shape-model/shapes/ShapeData';
import { KonvaFactory } from '../shape-factory/KonvaFactory';
import { DrawingService } from '../services/DrawingService';
import { PaintService } from '../services/HttpService';
@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.css'],

})
export class PaintComponent implements OnInit {
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
  moving:boolean=false;
  trans:boolean=false;
  konva: Konva.Shape|any
  shapes: Map<number, ShapeData> = new Map<number, ShapeData>();
  tr: Konva.Transformer = new Konva.Transformer();
  copiedShape : AbstractShape | any;
  text="text box";
  image: any;
  konvaFactory: KonvaFactory = new KonvaFactory()

  constructor(private paintService : PaintService, private drawingService: DrawingService) {}
  ngOnInit() {
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
      });
    },false);

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
    this.selectedTool = "copy";
    this.copy();
  }

  @HostListener('window:keyup.Control.v', ['$event']) cv() {
    this.selectedTool = "paste";
    this.paste();
  }

  @HostListener('window:keyup.Control.s', ['$event']) cs() {
    this.selectedTool = "save";
    this.save();
  }

  freehand(){
    let points = new Array();
    let shapeData = new ShapeData(new ShapeAttr(this.x, this.y, this.selectedColor, this.brushWidth, "rgb(0,0,0,0)", 0, 1))
    if(this.selectedTool=="brush"||this.selectedTool=="eraser"){
      let isPaint = false;
      let mode = this.selectedTool;
      let lastLine: Line<{
        stroke: string; strokeWidth: number; globalCompositeOperation: "source-over" | "destination-out";
        lineJoin: "round";
        points: never[];
      }>;
      this.stage.on('mousedown touchstart', (e)=> {
        if(this.selectedTool=="brush"||this.selectedTool=="eraser"){
          isPaint = true;
          let color: string;
          if(this.selectedTool==="eraser") { color = "white" }
          else { color = this.selectedColor;}
          this.x = this.stage?.getRelativePointerPosition()?.x;
          this.y = this.stage?.getRelativePointerPosition()?.y;
          shapeData.x = this.x, shapeData.y = this.y, shapeData.stroke = color, shapeData.fill = color, shapeData.type = 'freehand'
          this.konva = this.konvaFactory.getShape(shapeData)
          lastLine = new Konva.Line({
            stroke:  color ,
            fill: color ,
            strokeWidth: this.brushWidth,
            globalCompositeOperation:
            mode === 'brush' ? 'source-over' : 'destination-out' ,
            lineCap: 'round',
            lineJoin: 'round',
            points: [],
            draggable: false,
            name:"pen",
          });
        }
      });
      this.stage.on('mouseup touchend', ()=> {
        if(this.selectedTool=="brush"||this.selectedTool=="eraser"){ isPaint = false; }
      });
      this.stage.on('mousemove touchmove', (e)=> {
        if(this.selectedTool=="brush"||this.selectedTool=="eraser"){
        if (!isPaint) { return; }
        e.evt.preventDefault();
        const pos = this.stage.getRelativePointerPosition();
        let newPoints = lastLine.points().concat([pos.x, pos.y]);
        points.push(pos.x);
        points.push(pos.y);
        this.layer.add(lastLine);
        this.konva = lastLine;
        lastLine.points(newPoints);}
      });
      this.stage.on('mouseup', (e:any) => {
        shapeData.points = points
        this.shapes.set(this.konva._id, shapeData);
        console.log(this.konva)
        this.paintService.addNewShape(this.drawingService.konvaToData(this.konva)).subscribe();
      })
    }
  }

  drawShape(shape: string) {
    let shapeData = new ShapeData(new ShapeAttr(this.x, this.y, this.selectedColor, this.brushWidth, "rgb(0,0,0,0)", 0, 1))
    this.isdraw = true
    this.stage.on("mousedown",() => {
      if(this.selectedTool=='shape'){
        this.moving = false
        this.isdraw = true;
        this.trans = false
        this.x = this.stage?.getRelativePointerPosition()?.x;
        this.y = this.stage?.getRelativePointerPosition()?.y;
        shapeData.x = this.x
        shapeData.y = this.y
        shapeData.type = shape
        this.konva = this.konvaFactory.getShape(shapeData)
        this.layer.add(this.konva).batchDraw();
      }
    });

    this.stage.on("mousemove", () => {
      if(this.selectedTool=='shape'){
        this.moving = true;
        this.trans = false
        if(!this.isdraw) { return; }
        this.xx = this.stage?.getRelativePointerPosition()?.x;
        this.yy = this.stage?.getRelativePointerPosition()?.y;
        this.konva = this.drawingService.shapeOnMove(shape, this.konva, this.xx, this.x, this.yy, this.y, this.stage)
      }
    });
    this.stage.on("mouseup", () => {
      if(this.selectedTool=='shape'){
        this.isdraw = false;
        if(this.moving) {
          if(shape == 'line') {
            this.lineUp(shapeData)
            return;
          }
          let newShape = this.drawingService.konvaToData(this.konva)
          this.shapes.set(newShape.id, newShape);
          this.paintService.addNewShape(newShape).subscribe();
        }
        this.konva = null;
        }
    });
  }

  lineUp(shapeData: ShapeData) {
    shapeData.endX = this.konva.points[2]
    shapeData.endY = this.konva.points[3]
    this.layer.add(this.konva).batchDraw();
    this.shapes.set(shapeData.id, shapeData);
    this.paintService.addNewShape(shapeData).subscribe();
    this.konva = null
  }

  copy() {
    this.stage.on('click tap',  (e:any) => {
      if(this.selectedTool==="copy") {
        if (e.target != this.stage) { this.copiedShape = this.shapes.get(Number(e.target._id)) }
      }
    });
  }

  paste() {
    if(this.selectedTool==="paste") {
      this.isdraw = true;
      if(this.copiedShape === undefined) return;
      this.konva = this.drawingService.cloneShape(this.copiedShape);
      if(this.konva instanceof Konva.Line && this.konva.points().length == 4) {
        this.konva.setAttrs({
          points: [this.konva.points()[0] + 10, this.konva.points()[1] - 10, this.konva.points()[2] + 10, this.konva.points()[3] - 10]
        })
        this.layer.add(this.konva);
        let shape = this.drawingService.konvaToData(this.konva)
        this.paintService.addNewShape(shape).subscribe();
        return;
      }
      this.xx = this.stage?.getRelativePointerPosition()?.x;
      this.yy = this.stage?.getRelativePointerPosition()?.y;
      this.konva.setAttrs({
        x: this.xx,
        y: this.yy,
        fill:this.copiedShape.shapeAttr.fill,
      });
      this.stage.on("mousemove", () => {
        if(this.selectedTool === "paste"){
          this.moving = true;
          this.trans = false
          if(!this.isdraw) { return; }
          this.xx = this.stage?.getRelativePointerPosition()?.x;
          this.yy = this.stage?.getRelativePointerPosition()?.y;
          this.konva.setAttrs({
            x: this.xx,
            y: this.yy,
          });
          this.layer.add(this.konva).batchDraw();
        }}
      );

      this.stage.on("mouseup", () => {
        if(this.selectedTool === "paste"){
          this.isdraw = false;
          if(this.moving) {
            let shape = this.drawingService.konvaToData(this.konva)
            this.shapes.set(this.konva._id, shape)
            this.paintService.copyShape(this.copiedShape.getId(), this.konva._id, this.konva.x(), this.konva.y()).subscribe();
          }
        }}
      );
    }
  }

  resize() {
    if(this.selectedTool==="resize"){
      var tr = new Konva.Transformer({ ignoreStroke: true, });
      this.layer.add(tr);
    }
    this.stage.on('mousedown touchstart', (e) => { //make sure i click on shape
      if(this.selectedTool==="resize" && e.target !== this.stage){  return }
      else{
        tr.nodes([]);
        return;
      }
    })

    this.stage.on('mousemove touchmove', () => {
      if(this.selectedTool!="resize"){tr.nodes([]);  return;}
    })
    this.stage.on('click tap',  (e) => {
      if(this.selectedTool==="resize") {
        if (e.target === this.stage) {tr.nodes([]); return;} //if click on stage not konva shape then return
        else {
          if(e.target.constructor.name=="Rect"){
            tr.nodes([e.target]).on('transform', () => { //
              e.target.setAttrs({
                width: Math.max(tr.nodes([e.target]).width() * tr.nodes([e.target]).scaleX(), 5),
                height: Math.max(tr.nodes([e.target]).height() * tr.nodes([e.target]).scaleY(), 5),
                scaleX: 1,
                scaleY: 1,
              });
              let shape = this.drawingService.konvaToData(this.konva)
              this.shapes.set(e.target._id, shape)
              this.paintService.updateShape(e.target._id, shape)
            });
          }
          else if(e.target.constructor.name=="Circle"){
            tr.setAttrs({
              enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
            })
            tr.nodes([e.target]).on('transform', () => { //
              e.target.setAttrs({
                radius: Math.max(((tr.nodes([e.target]).width()* tr.nodes([e.target]).scaleX() )+ (tr.nodes([e.target]).height()* tr.nodes([e.target]).scaleY() ))/4, 5),
                scaleX: 1,
                scaleY: 1,
              });
              let shape = this.drawingService.konvaToData(this.konva)
              this.shapes.set(e.target._id, shape)
              this.paintService.updateShape(e.target._id, shape)
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
              let shape = this.drawingService.konvaToData(this.konva)
              this.shapes.set(e.target._id, shape)
              this.paintService.updateShape(e.target._id, shape)
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
              let shape = this.drawingService.konvaToData(this.konva)
              this.shapes.set(e.target._id, shape);
              this.paintService.updateShape(e.target._id, shape)
            });
          }
        } //else put in the nodes the selected konva shape
      }
      else {
        tr.nodes([]);
        return;
      }
      this.konva = e.target;
    })
    this.stage.on('mouseup', (e:any) => {
      if (e.target != this.stage&& e.target.name()!="pen") {
        this.updateETarget(e.target)
      }
    })
  }

  move() {
    this.stage.on('mousemove touchmove',  (e:any) => {
      if(this.selectedTool==="move") {
        if (e.target != this.stage&& e.target.name()!="pen" ) {
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
      if (e.target != this.stage && e.target.name() != "pen" && this.selectedTool === "move" ) {
        let shape = this.drawingService.konvaToData(this.konva)
        this.shapes.set(e.target._id, shape)
        this.paintService.updateShape(this.konva._id, shape)
      }
    })
  }

  undo() {
    this.paintService.undo().subscribe((res)=>{
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
      for(let key in y){ this.loadHandling(y[key]); }
    })
  }

  redo() {
    this.paintService.redo().subscribe((res)=>{
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
      for(let key in y){ this.loadHandling(y[key]); }
    })
  }

  load() {
    this.paintService.load().subscribe(res => {
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
        this.loadHandling(y[key]);
      }
    });
  }

  loadHandling(y : any){
    this.konva = this.konvaFactory.getShape(y)
    this.konva._id = y.id;
    this.layer.add(this.konva).batchDraw();
    this.shapes.set(y.id, this.drawingService.konvaToData(this.konva));
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

  clearAll() {
    if (confirm('Are you sure you want to clear all?')) {
      this.layer = new Layer();
      this.layer.add(this.image);
      this.stage.add(this.layer);
      this.paintService.deleteAllShapes().subscribe((res)=>{ this.shapes.clear(); });
    }
  }

  saveImage() { this.drawingService.saveImage(this.stage) }

  save() { this.paintService.save().subscribe(); }

  fill(){
    this.stage.on('click tap',  (e:any) => {
      if(this.selectedTool==="fill" && e.target.constructor.name != "Line"){
        if (e.target != this.stage) {
          e.target.setAttrs({
            fill:this.selectedColor,
          });
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
        this.updateETarget(e.target)
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
          this.updateETarget(e.target)
        }
      }
    });
  }

  mirror() {
    this.stage.on('click tap',  (e:any) => {
      if(this.selectedTool==="mirror"  && e.target.constructor.name != "Line"){
        if (e.target != this.stage) {
          e.target.setAttrs({
            scaleX: -e.target.scaleX(),
            fill:this.selectedColor,
          });
          this.updateETarget(e.target)
        }
      }
    });
    this.stage.on('mouseup', (e:any) => {
      if (e.target != this.stage&& e.target.name()!="pen"&&this.selectedTool==="mirror") {
        e.target.setAttrs({
          scaleX: e.target.scaleX(),
        });
        this.updateETarget(e.target)
      }
    });
  }

  updateETarget(e: Konva.Shape){
    let shape = this.drawingService.konvaToData(e)
    this.shapes.set(e._id, shape);
    this.paintService.updateShape(e._id, shape)
  }
}
