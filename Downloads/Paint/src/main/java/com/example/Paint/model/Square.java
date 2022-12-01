package com.example.Paint.model;

public class Square extends Shape {
    private float length;

    public Square(float x, float y, float length) {
        startPoint = new Point(x, y);
        this.length = length;
    }

    public Square(float x1, float y1, float x2, float y2) {
        startPoint = new Point(x1, y1);
        this.length = Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
    }

    public float getLength() {
        return length;
    }

    public void setLength(float length) {
        this.length = length;
    }
}
