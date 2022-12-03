package com.example.Paint.dao;

import com.example.Paint.Service.ShapePrototype;
import com.example.Paint.model.Shape;

import java.util.ArrayList;
import java.util.List;

public class FakeShapeDataAccessService implements ShapeDAO {
    List<Shape> DB = new ArrayList<>();

    @Override
    public List<Shape> getAllShapes() {
        return DB;
    }

    @Override
    public Shape addShape(Shape shape) {
        DB.add(shape);
        return shape;
    }

    @Override
    public Shape addCopy(int id) {
        for (Shape shape : DB) {
            if (shape.getId() == id) {
                Shape copiedShape = ShapePrototype.getClone(shape);
                //TODO set new id
                return addShape(copiedShape);
            }
        }
        return null;
    }

    @Override
    public Shape updateShape(int id, Shape shape) {
        for (Shape oldShape : DB) {
            if (oldShape.getId() == id) {
                oldShape = shape;
                return shape;
            }
        }
        return null;
    }

    @Override
    public void deleteShape(int id) {
        DB.removeIf(shape -> shape.getId() == id);
    }
}
