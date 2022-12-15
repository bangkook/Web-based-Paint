package com.example.Paint.dao;

import com.example.Paint.Service.ShapeFactory;
import com.example.Paint.Service.ShapePrototype;
import com.example.Paint.input.ShapeData;
import com.example.Paint.model.Point;
import com.example.Paint.model.Shape;
import com.google.gson.Gson;
import org.springframework.stereotype.Component;

import java.beans.XMLDecoder;
import java.beans.XMLEncoder;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Stack;


@Component
public class FakeShapeDataAccessService implements ShapeDAO {
    private Map<Integer, Shape> DB = new HashMap<>();

    //stores top of undo stack
    private Point action;
    //stores all forward actions
    private Stack<Point> undo = new Stack<Point>();
    //stores all backward actions
    private Stack<Point> redo = new Stack<Point>();

    private Stack<ArrayList<Shape>> clearedIdsUndo = new Stack<ArrayList<Shape>>();

    private Stack<ArrayList<Shape>> clearedIdsRedo = new Stack<ArrayList<Shape>>();

    @Override
    public Map<Integer, Shape> getAllShapes() {
        return DB;
    }

    @Override
    public Shape addShape(Shape shape) { //action added redo done
        int id = shape.getId();
        DB.put(id, shape);
        undo.add(new Point(id, shape));
        redo.clear();
        clearedIdsRedo.clear();
        return shape;
    }

    @Override
    public Shape addCopy(int shapeId, int idCloned, float x, float y) { //action added, redo done
        if (!DB.containsKey(shapeId))
            return null;

        Shape copiedShape = ShapePrototype.getClone(DB.get(shapeId));
        assert copiedShape != null;
        copiedShape.setStartX(x);
        copiedShape.setStartY(y);
        copiedShape.setId(idCloned);
        System.out.println(x + " " + y);
        redo.clear();
        clearedIdsRedo.clear();
        return addShape(copiedShape);
    }

    @Override
    public Shape updateShape(int id, ShapeData shapeData) { //action added redo done
        if (!DB.containsKey(id))
            return null;
        DB.replace(id, setAttributes(shapeData));
        redo.clear();
        clearedIdsRedo.clear();
        return DB.get(id);
    }

    @Override
    public void deleteShape(int id) { //action added redo done
        this.formDeleteAction(id);
        DB.remove(id);
        undo.add(new Point(id, null));
        redo.clear();
        clearedIdsRedo.clear();
    }

    @Override
    public void deleteAll() { //action added redo done
        this.undo.add(new Point(-1, null)); //means all clearedIds
        this.formClearAction();
        redo.clear();
        clearedIdsRedo.clear();
        this.DB.clear();
    }

    private void formClearAction() {
        ArrayList<Shape> clearedIds = new ArrayList<Shape>();
        for (Entry<Integer, Shape> entry : DB.entrySet()) {
            clearedIds.add(entry.getValue());
        }
        clearedIdsUndo.push(clearedIds);
    }

    private void formDeleteAction(int id) {
        ArrayList<Shape> clearedIds = new ArrayList<Shape>();
        clearedIds.add(DB.get(id));
        clearedIdsUndo.push(clearedIds);
    }

    @Override
    public Map<Integer, Shape> undo() {
        for (Map.Entry<Integer, Shape> entry : DB.entrySet()) {
            System.out.println(entry.getKey() + "=" + entry.getValue());
        }
        if (undo.isEmpty())
            return DB;
        action = new Point(undo.peek().getKey(), undo.peek().getShape());
        undo.pop();
        redo.push(action);
        formAllShapesOnUndo(action);
        return DB;
    }

    /*
     * Actions can be:
     * (+ve int, shape) //adding or updating shape
     * (-ve int, null) // clear all forward
     * (+ve int, null) // deleting shape
     * */
    private void formAllShapesOnUndo(Point action) {
        if (action.getKey() > 0 && action.getShape() == null) { //means last action was deleting that shape
            DB.put(action.getKey(), clearedIdsUndo.peek().get(0));
            System.out.println("restoreOne undo");
            clearedIdsRedo.push(clearedIdsUndo.pop());
        } else if (action.getKey() < 0) { //means last action was to clear all
            this.restoreAllUndo();
            System.out.println("restoreAll undo");
        } else if (action.getKey() > 0) { // means last action was either adding new shape or updating shape
            Point index = this.containsKey(action.getKey());
            if (index != null) { //shape found means it was updated
                DB.replace(action.getKey(), index.getShape());
                System.out.println("updateOne UNDO");
            } else {
                DB.remove(action.getKey());
                System.out.println("deleteOne UNDO");

                for (Map.Entry<Integer, Shape> entry : DB.entrySet()) {
                    System.out.println(entry.getKey() + "=" + entry.getValue());
                }
            }
        }
    }

    private void restoreAllUndo() {
        if (clearedIdsUndo.isEmpty()) return;
        ArrayList<Shape> indexes = this.clearedIdsUndo.peek();
        for (int i = 0; i < indexes.size(); i++) {
            //Point ind = this.containsKey(indexes.get(i));
            DB.put(indexes.get(i).getId(), indexes.get(i));
        }
        for (Map.Entry<Integer, Shape> entry : DB.entrySet()) {
            System.out.println(entry.getKey() + "=" + entry.getValue());
        }
        //all shapes restored, peek accessed then poped on redone when clear all action is in redo
        clearedIdsRedo.add(clearedIdsUndo.pop());
    }

    private Point containsKey(int id) {
        for (int i = undo.size() - 1; i >= 0; i--) {
            if (id == undo.get(i).getKey() && undo.get(i).getShape() != null) {
                return undo.get(i);
            }
        }
        return null;
    }

    @Override
    public Map<Integer, Shape> redo() {
        for (Map.Entry<Integer, Shape> entry : DB.entrySet()) {
            System.out.println(entry.getKey() + "=" + entry.getValue());
        }
        if (redo.isEmpty())
            return DB;
        action = new Point(redo.peek().getKey(), redo.peek().getShape());
        redo.pop();
        this.formAllShapesOnRedo(action);
        return DB;
    }

    /*Actions can be:
     * (+ve, shape)
     * (-ve, null) delete all
     * (+ve, null) delete it
     * */
    private void formAllShapesOnRedo(Point action) {
        if (action.getKey() < 0) { //delete all
            this.formClearAction();
            this.DB.clear();
        } else if (action.getKey() > 0 && action.getShape() == null) { //delete shape
            DB.remove(action.getKey());
            clearedIdsUndo.push(clearedIdsRedo.pop());
        } else if (action.getKey() > 0 && action.getShape() != null) { //either add or modify
            Point index = this.containsKey(action.getKey());
            if (index != null) { //shape found means it was updated
                DB.replace(action.getKey(), action.getShape());
            } else {
                DB.put(action.getKey(), action.getShape());
            }
        }
        undo.push(action);
    }

    @Override
    public void save() throws IOException {
        Utility util = new Utility();
        util.saveFile();
        String filePath = util.getFilePath();
        String extension = util.getExtension();
        if (filePath == null) return;

        if (extension.equals(".json")) {
            try {
                BufferedWriter writer = Files.newBufferedWriter(Paths.get(filePath.concat(extension)));

                // create Gson instance
                Gson gson = new Gson();

                // write JSON to file
                gson.toJson(DB, writer);

                //close the writer
                writer.close();

            } catch (Exception ex) {
                ex.printStackTrace();
            }
        } else {
            try {

                FileOutputStream fos = new FileOutputStream(filePath.concat(extension));
                //ByteArrayOutputStream bos = new ByteArrayOutputStream();
                XMLEncoder xmlEncoder = new XMLEncoder(fos);
                xmlEncoder.writeObject(DB);
                xmlEncoder.close();
                fos.flush();
                fos.close();

            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
    }

    @Override
    public String load() throws IOException {
        Utility util = new Utility();
        util.loadFile();
        String filePath = util.getFilePath();
        String extension = util.getExtension();
        if (filePath == null) return new Gson().toJson(DB);
        if (extension.equals(".json")) {
            try {
                // create Gson instance
                Gson gson = new Gson();

                // create a reader
                Reader reader = Files.newBufferedReader(Paths.get(filePath));

                // convert JSON file to map
                DB = gson.fromJson(reader, Map.class);

                // print map entries
                for (Map.Entry<Integer, Shape> entry : DB.entrySet()) {
                    System.out.println(entry.getKey() + "=" + entry.getValue());
                }

                // close reader
                reader.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {

            try {
                FileInputStream fis = new FileInputStream(filePath);
                XMLDecoder decoder = new XMLDecoder(fis);
                DB = (Map<Integer, Shape>) decoder.readObject();
                for (Map.Entry<Integer, Shape> entry : DB.entrySet()) {
                    System.out.println(entry.getKey() + "=" + entry.getValue());
                }
                decoder.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return new Gson().toJson(DB);
    }

    private Shape setAttributes(ShapeData shapeData) {
        Shape updatedShape = ShapeFactory.getShape(shapeData);
        undo.add(new Point(shapeData.id, updatedShape));
        return updatedShape;
    }
}
