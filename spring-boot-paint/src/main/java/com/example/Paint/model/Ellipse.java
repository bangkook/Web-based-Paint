package com.example.Paint.model;

public class Ellipse extends Shape {
    private float width;
    private float height;

    public Ellipse(float width, float height, String stroke, String fill, int id,
                   float startX, float startY, float strokeWidth, float rotation) {
        super("ellipse", stroke, fill, id, startX, startY, strokeWidth, rotation);
        this.width = width;
        this.height = height;
    }

    public float getWidth() {
        return width;
    }

    public void setWidth(float width) {
        this.width = width;
    }

    public float getHeight() {
        return height;
    }

    public void setHeight(float height) {
        this.height = height;
    }
}
