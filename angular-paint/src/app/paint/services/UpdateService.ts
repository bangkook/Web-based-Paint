import { Injectable } from '@angular/core';
import Konva from 'konva';
import { PaintService } from './HttpService';
import { ShapeBuilder } from '../shape-generator/shape-builder/builder/ShapeBuilder';
import { ShapeFactory } from '../shape-generator/shape-factory/ShapeFactory';
import { ShapeAttr } from '../shape-model/shape-attributes';
import { AbstractShape } from '../shape-model/shape-model';
import { ConversionService } from './conversion.service';
import { ShapeDataService } from './ShapeDataService';


@Injectable()
export class Update {

    shape: ShapeFactory = new ShapeFactory();
    convert: ConversionService = new ConversionService();
    builder: ShapeBuilder = new ShapeBuilder();
    attributs: ShapeAttr = new ShapeAttr();

    public update(konva: Konva.Shape, paintService: PaintService): AbstractShape {
        let shape: AbstractShape = this.convert.konvaToShape(konva);
        this.attributs = this.updateToKonvaAttributes(konva);
        if(konva instanceof Konva.Circle) {
            shape = this.shape.getCircle(konva._id, this.attributs, konva.radius());
        } else if(konva instanceof Konva.Ellipse) {
            shape = this.shape.getEllipse(konva._id, this.attributs, konva.getWidth(), konva.getHeight());
        } else if(konva instanceof Konva.Rect && konva.attrs.height != konva.attrs.width) {
            shape = this.shape.getRectangle(konva._id, this.attributs, konva.height(), konva.width(), konva.attrs.cornerRadius);
        } else if(konva instanceof Konva.Line && konva.points().length <= 4) {
            let points: number[] = konva.points();
            shape = this.shape.getLine(konva._id, this.attributs, points[2], points[3]);
        } else if(konva instanceof Konva.Rect) {
            shape = this.shape.getSquare(konva._id, this.attributs, konva.width(), 0);
        } else if(konva instanceof Konva.RegularPolygon) {
            shape = this.shape.getTriangle(konva._id, this.attributs, konva.radius(), konva.attrs.cornerRadius);
        } else if(konva instanceof Konva.Line) {
            shape = this.shape.getFreeHand(konva._id, this.attributs, konva.points());
        }
        let data = new ShapeDataService();
        paintService.updateShape(konva._id, data.formShapeData(shape)).subscribe((res)=>{
            return shape;
        });
        return shape;
    }

    updateToKonvaAttributes(konva: Konva.Shape) {
        this.builder.buildDetailedAttr(konva.x(), konva.y(), konva.scaleX(), konva.stroke(), konva.strokeWidth(), konva.fill(), konva.rotation());
        return this.builder.getShapeAttr();
    }
}
