package com.example.Paint.model;

import java.io.Serializable;
import java.beans.JavaBean;
import java.util.ArrayList;

@JavaBean
public class Pen extends Shape implements Serializable {
    Float[] points;

    public Pen(String stroke, String fill, int id, float startX, float startY,
               float scaleX, float strokeWidth, float rotation, Float[] points) {
        super("freehand", stroke, fill, id, startX, startY, scaleX, strokeWidth, rotation);
        this.points = points;
    }
    
    public Pen(){}
    
    public Float[] getPoints() { return this.points; }
    
    public void serPoints(Float[] points) { this.points = points; }
    
}
