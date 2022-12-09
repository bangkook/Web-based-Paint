package com.example.Paint.model;

public class Rectangle extends Shape {
    private float length;
    private float width;
    private float cornerRadius;

    public Rectangle(float length, float width, String stroke, String fill, int id,
                     float startX, float startY, float strokeWidth, float rotation, float cornerRadius) {
        super("rectangle", stroke, fill, id, startX, startY, strokeWidth, rotation);
        this.length = length;
        this.width = width;
        this.cornerRadius = cornerRadius;
    }

    public float getLength() {
        return length;
    }

    public void setLength(float length) {
        this.length = length;
    }

    public float getCornerRadius() {
        return cornerRadius;
    }

    public void setCornerRadius(float cornerRadius) {
        this.cornerRadius = cornerRadius;
    }

    public float getWidth() {
        return width;
    }

    public void setWidth(float width) {
        this.width = width;
    }
}
