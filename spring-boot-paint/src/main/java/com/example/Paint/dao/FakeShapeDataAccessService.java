package com.example.Paint.dao;

import com.example.Paint.Service.ShapePrototype;
import com.example.Paint.model.Shape;
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
    public Shape updateShape(int id, Shape shape) {
        if (!DB.containsKey(id))
            return null;

        Shape oldShape = DB.get(id);
        return oldShape = shape;
    }

    @Override
    public void deleteShape(int id) {
        DB.remove(id);
    }
}
