package com.example.Paint.model;

import java.beans.JavaBean;
import java.io.Serializable;

@JavaBean
public class Pen extends Shape implements Serializable {
    Float[] points;

    public Pen(String stroke, String fill, int id, float startX, float startY,
               float scaleX, float strokeWidth, float rotation, Float[] points) {
        super("freehand", stroke, fill, id, startX, startY, scaleX, strokeWidth, rotation);
        this.points = points;
    }

    public Pen() {
        super();
    }

    public Float[] getPoints() {
        return this.points;
    }

    public void serPoints(Float[] points) {
        this.points = points;
    }

}
