package com.example.Paint.Controller;

import com.example.Paint.Service.PaintService;
import com.example.Paint.input.ShapeInput;
import com.example.Paint.model.Shape;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin()
@RequestMapping("/paint")
public class PaintController {
    @Autowired
    private final PaintService paintService;

    public PaintController(PaintService paintService) {
        this.paintService = paintService;
    }

    @GetMapping("/all")
    public List<Shape> getAllShapes() {
        return this.paintService.getAllShapes();
    }

    @PostMapping("/add")
    public Shape addNewShape(@RequestBody ShapeInput shapeInput) {
        return this.paintService.addNewShape(shapeInput);
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
