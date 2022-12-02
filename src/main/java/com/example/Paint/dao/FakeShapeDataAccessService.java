package com.example.Paint.dao;

import com.example.Paint.model.Shape;

import java.util.ArrayList;
import java.util.List;

public class FakeShapeDataAccessService implements ShapeDAO {
    List<Shape> DB = new ArrayList<>();

    @Override
    public int addShape(Shape shape) {
        DB.add(shape);
        return 1;
    }
}
