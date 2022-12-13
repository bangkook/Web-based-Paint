package com.example.Paint.model;

import java.beans.JavaBean;

@JavaBean
public abstract class Shape implements Cloneable {
    private String type, stroke, fill;
    private int id;
    private float startX, startY, scaleX;
    private float strokeWidth, rotation;

    public Shape(String type, String stroke, String fill, int id, float startX, float startY, float scaleX, float strokeWidth, float rotation) {
        this.type = type;
        this.stroke = stroke;
        this.fill = fill;
        this.id = id;
        this.startX = startX;
        this.startY = startY;
        this.strokeWidth = strokeWidth;
        this.rotation = rotation;
    }

    public Shape() {
    }

    public Object clone() {
        try {
            return super.clone();
        } catch (CloneNotSupportedException e) {
            throw new InternalError();
        }
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStroke() {
        return stroke;
    }

    public void setStroke(String stroke) {
        this.stroke = stroke;
    }

    public String getFill() {
        return fill;
    }

    public void setFill(String fill) {
        this.fill = fill;
    }

    public float getStartX() {
        return startX;
    }

    public void setStartX(float startX) {
        this.startX = startX;
    }

    public float getStartY() {
        return startY;
    }

    public void setStartY(float startY) {
        this.startY = startY;
    }

    public float getStrokeWidth() {
        return strokeWidth;
    }

    public void setStrokeWidth(float strokeWidth) {
        this.strokeWidth = strokeWidth;
    }

    public float getRotation() {
        return rotation;
    }

    public void setRotation(float rotation) {
        this.rotation = rotation;
    }

    public float getScaleX() {
        return scaleX;
    }

    public void setScaleX(float rotation) {
        this.scaleX = rotation;
    }
    
}
