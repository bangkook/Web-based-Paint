package com.example.Paint.Service;

import com.example.Paint.model.*;

public class ShapeFactory {
    public Shape getShape(ShapeType shape, float[] pars) {
        if (shape == ShapeType.LINE) {
            return new Line(pars[0], pars[1], pars[2], pars[3]);
        } else if (shape == ShapeType.CIRCLE) {
            return new Circle(pars[0], pars[1], pars[2]);
        } else if (shape == ShapeType.ELLIPSE) {
            return new Ellipse(pars[0], pars[1], pars[2], pars[3]);
        } else if (shape == ShapeType.TRIANGLE) {
            return new Line(pars[0], pars[1], pars[2], pars[3]);
        } else if (shape == ShapeType.SQUARE) {
            return new Square(pars[0], pars[1], pars[2]);
        } else if (shape == ShapeType.RECTANGLE) {
            return new Rectangle(pars[0], pars[1], pars[2], pars[3]);
        }
        return null;
    }
}
