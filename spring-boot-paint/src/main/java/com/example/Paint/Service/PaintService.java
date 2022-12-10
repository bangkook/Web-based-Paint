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

//    @Autowired
//    private final ActionsData actionsData;

    public PaintService(ShapeDAO shapeDAO) {
        this.shapeDAO = shapeDAO;
//        this.actionsData = actionsData;
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

    public void save(String fileName, String extension) throws IOException {
        shapeDAO.save(fileName, extension);
    }

    public Map<Integer, Shape> load(String fileName, String extension) throws IOException {
        return shapeDAO.load(fileName, extension);
    }

}
