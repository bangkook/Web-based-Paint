package com.example.Paint.Service;

import com.example.Paint.dao.ShapeDAO;
import com.example.Paint.input.ShapeData;
import com.example.Paint.model.Shape;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
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

    public Shape addCopy(int shapeId, int idCloned, float x, float y) {
        return shapeDAO.addCopy(shapeId, idCloned, x, y);
    }

    public Shape updateShape(int id, ShapeData shapeData) {
        return shapeDAO.updateShape(id, shapeData);
    }

    public void deleteShape(int id) {
        shapeDAO.deleteShape(id);
    }

    public Map<Integer, Shape> undo() {
        return shapeDAO.undo();
    }

    public Map<Integer, Shape> redo() {
        return shapeDAO.redo();
    }

    public void deleteAll() {
        shapeDAO.deleteAll();
    }

    public void save() throws IOException {
        shapeDAO.save();
    }

    public String load() throws IOException {
        return shapeDAO.load();
    }

}
