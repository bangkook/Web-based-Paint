package com.example.Paint.dao;

import com.example.Paint.model.Shape;

import java.util.Map;

public interface ShapeDAO {
    //TODO : add id
    Map<Integer, Shape> getAllShapes();

    Shape addShape(Shape shape);

    Shape addCopy(int id);

    Shape updateShape(int id, Shape shape);

    void deleteShape(int id);

}