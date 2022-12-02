package com.example.Paint.Service;

import com.example.Paint.model.*;

public class ShapePrototype {

    public Shape getClone(Shape shape) {

        if (shape.type == ShapeType.LINE) {
            return (Line) shape.clone();

        } else if (shape.type == ShapeType.CIRCLE) {
            return (Circle) shape.clone();

        } else if (shape.type == ShapeType.ELLIPSE) {
            return (Ellipse) shape.clone();

        } else if (shape.type == ShapeType.TRIANGLE) {
            return (Triangle) shape.clone();

        } else if (shape.type == ShapeType.SQUARE) {
            return (Square) shape.clone();

        } else if (shape.type == ShapeType.RECTANGLE) {
            return (Rectangle) shape.clone();
        }

        return null;
    }
}
