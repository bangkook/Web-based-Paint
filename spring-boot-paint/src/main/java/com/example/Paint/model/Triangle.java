package com.example.Paint.model;

public class Triangle extends Shape {
    float width, height;

    public Triangle(float x, float y, float width, float height) {
        this.startPoint = new Point(x, y);
        this.width = width;
        this.height = height;
        this.type = ShapeType.TRIANGLE;
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
