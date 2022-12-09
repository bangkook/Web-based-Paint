package com.example.Paint.Controller;

import com.example.Paint.Service.PaintService;
import com.example.Paint.input.ShapeData;
import com.example.Paint.model.Shape;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin("http://localhost:4200/")
//@RequestMapping("/paint")
public class PaintController {
    @Autowired
    private final PaintService paintService;

    public PaintController(PaintService paintService) {
        this.paintService = paintService;
    }

    @GetMapping("/all")
    public Map<Integer, Shape> getAllShapes() {
        return this.paintService.getAllShapes();
    }

    @PostMapping(value = "/add", consumes = {"application/json"})
    public Shape addNewShape(@RequestBody ShapeData shapeInput) {
        return this.paintService.addNewShape(shapeInput);
    }

    @GetMapping(value = "/copy", produces = {"application/json"})
    public Shape addCopy(int id) {
        return this.paintService.addCopy(id);
    }

    @PutMapping(path = "/update/{shapeId}")
    public Shape updateShape(@PathVariable("shapeId") int shapeId,
                             @RequestBody Shape shape) {
        return this.paintService.updateShape(shapeId, shape);
    }

    @DeleteMapping("/delete/{shapeId}")
    public void deleteShape(@PathVariable("shapeId") int shapeId) {
        this.paintService.deleteShape(shapeId);
    }

}
