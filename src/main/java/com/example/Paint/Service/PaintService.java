package com.example.Paint.Service;

import com.example.Paint.dao.ShapeDAO;
import com.example.Paint.model.Shape;

public class PaintService {
    private final ShapeDAO shapeDAO;

    public PaintService(ShapeDAO shapeDAO) {
        this.shapeDAO = shapeDAO;
    }

    public int addNewShape(Shape shape) {
        // dummy array
        float[] pars = new float[100];
        return shapeDAO.addShape(ShapeFactory.getShape(shape.type, pars));
    }
}
