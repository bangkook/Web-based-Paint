package com.example.Paint.dao;

import com.example.Paint.Service.ShapePrototype;
import com.example.Paint.input.ShapeData;
import com.example.Paint.model.*;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;


@Component
public class FakeShapeDataAccessService implements ShapeDAO {
    // List<Shape> DB = new ArrayList<>();
    Map<Integer, Shape> DB = new HashMap<>();
    int MAX = 10000; // maximum number of shapes to be saved in database

    @Override
    public Map<Integer, Shape> getAllShapes() {
        return DB;
    }

    @Override
    public Shape addShape(Shape shape) {
        int id = new Random().nextInt(MAX);
        // check for id uniqueness
        while (DB.containsKey(id)) {
            id = new Random().nextInt(MAX);
        }
        shape.setId(id);
        DB.put(id, shape);
        return shape;
    }

    @Override
    public Shape addCopy(int id) {
        if (!DB.containsKey(id))
            return null;

        Shape copiedShape = ShapePrototype.getClone(DB.get(id));
        return addShape(copiedShape);
    }

    @Override
    public Shape updateShape(int id, ShapeData shapeData) {
        if (!DB.containsKey(id))
            return null;
        Shape oldShape = DB.get(id);

        //shape = ShapeFactory.getShape(shapeData);
        return setAttributes(oldShape, shapeData);
    }

    @Override
    public void deleteShape(int id) {
        DB.remove(id);
    }

    private Shape setAttributes(Shape shape, ShapeData shapeData) {
        shape.setStartX(shapeData.x);
        shape.setStartY(shapeData.y);
        shape.setFill(shapeData.fill);
        shape.setRotation(shapeData.rotation);
        shape.setStroke(shapeData.stroke);
        shape.setStrokeWidth(shapeData.strokeWidth);
        String type = shape.getType().toLowerCase();
        switch (type) {
            case "circle":
                ((Circle) shape).setRadius(shapeData.radius);
                break;
            case "ellipse":
                ((Ellipse) shape).setHeight(shapeData.height);
                ((Ellipse) shape).setWidth(shapeData.width);
                break;
            case "triangle":
                ((Triangle) shape).setHeight(shapeData.height);
                ((Triangle) shape).setWidth(shapeData.width);
                break;
            case "rectangle":
                ((Rectangle) shape).setLength(shapeData.length);
                ((Rectangle) shape).setWidth(shapeData.width);
                break;
            case "square":
                ((Square) shape).setLength(shapeData.length);
                break;
            case "line":
                ((Line) shape).setEndX(shapeData.endX);
                ((Line) shape).setEndY(shapeData.endY);
                break;
        }
        return shape;
    }
}
