package com.example.Paint.Service;

import com.example.Paint.model.*;

public class ShapePrototype {

    public static Shape getClone(Shape shape) {

        String type = shape.getType().toLowerCase();

        switch (type) {
            case "line":
                return (Line) shape.clone();

            case "circle":
                return (Circle) shape.clone();

            case "ellipse":
                return (Ellipse) shape.clone();

            case "triangle":
                return (Triangle) shape.clone();

            case "square":
                return (Square) shape.clone();

            case "rectangle":
                return (Rectangle) shape.clone();
            case "freehand":
                return (Pen) shape.clone();
        }

        return null;
    }
}
