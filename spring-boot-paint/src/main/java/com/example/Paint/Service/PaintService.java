package com.example.Paint.Service;

import com.example.Paint.dao.ShapeDAO;
import com.example.Paint.input.ShapeData;
import com.example.Paint.model.Shape;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class PaintService {
    @Autowired
    private final ShapeDAO shapeDAO;

    public PaintService(ShapeDAO shapeDAO) {
        this.shapeDAO = shapeDAO;
    }

    public Map<Integer, Shape> getAllShapes() {
        return shapeDAO.getAllShapes();
    }

    public Shape addNewShape(ShapeData shapeInput) {
        return shapeDAO.addShape(ShapeFactory.getShape(shapeInput));
    }

    public Shape addCopy(int id) {
        return shapeDAO.addCopy(id);
    }

    public Shape updateShape(int id, Shape shape) {
        return shapeDAO.updateShape(id, shape);
    }

    public void deleteShape(int id) {
        shapeDAO.deleteShape(id);
    }
}
