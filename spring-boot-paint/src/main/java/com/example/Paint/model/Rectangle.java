package com.example.Paint.model;

public class Rectangle extends Shape {
    private float height;
    private float width;

    public Rectangle(float x, float y, float width, float height) {
        startPoint = new Point(x, y);
        this.height = height;
        this.width = width;
        //this.type = ShapeType.RECTANGLE;
    }

    public float getHeight() {
        return height;
    }

    public void setHeight(float height) {
        this.height = height;
    }

    public float getWidth() {
        return width;
    }

    public void setWidth(float width) {
        this.width = width;
    }
}
