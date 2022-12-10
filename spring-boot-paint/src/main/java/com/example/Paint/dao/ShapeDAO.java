package com.example.Paint.dao;

import com.example.Paint.input.ShapeData;
import com.example.Paint.model.Shape;

import java.io.IOException;
import java.util.Map;

public interface ShapeDAO {
    //TODO : add id
    Map<Integer, Shape> getAllShapes();

    Shape addShape(Shape shape);

    Shape addCopy(int id);

    Shape updateShape(int id, ShapeData shapeData);

    void deleteShape(int id);

    void deleteAll();

    Map<Integer, Shape> undo();

    Map<Integer, Shape> redo();

    void save(String fileName, String extension) throws IOException;

    Map<Integer, Shape> load(String fileName, String extension) throws IOException;

}
