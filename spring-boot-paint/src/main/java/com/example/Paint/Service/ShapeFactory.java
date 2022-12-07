package com.example.Paint.Service;

import com.example.Paint.input.ShapeInput;
import com.example.Paint.model.Circle;
import com.example.Paint.model.Shape;

public class ShapeFactory {

    public static Shape getShape(ShapeInput shapeInput) {
        String shape = shapeInput.type;
        System.out.println("HERE" + shapeInput.startX);

        if (shape.equals("circle")) {
            return new Circle(shapeInput.startX, shapeInput.startY, shapeInput.radius);
        }
        /*if (shape == ShapeType.LINE) {
            return new Line(shapeInput.startX, shapeInput.startY, shapeInput.endX, shapeInput.endY);

        } else if (shape == ShapeType.CIRCLE) {
            return new Circle(shapeInput.startX, shapeInput.startY, shapeInput.radius);

        } else if (shape == ShapeType.ELLIPSE) {
            return new Ellipse(shapeInput.startX, shapeInput.startY, shapeInput.width, shapeInput.height);

        } else if (shape == ShapeType.TRIANGLE) {
            return new Line(shapeInput.startX, shapeInput.startY, shapeInput.width, shapeInput.height);

        } else if (shape == ShapeType.SQUARE) {
            return new Square(shapeInput.startX, shapeInput.startY, shapeInput.length);

        } else if (shape == ShapeType.RECTANGLE) {
            return new Rectangle(shapeInput.startX, shapeInput.startY, shapeInput.length, shapeInput.width);
        }*/

        return null;
    }
}
