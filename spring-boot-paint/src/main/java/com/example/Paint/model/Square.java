package com.example.Paint.model;

public class Square extends Shape {
    private float length;
    private float cornerRadius;

    public Square(float length, String stroke, String fill, int id,
                float startX, float startY, float scaleX, float strokeWidth, float rotation, float cornerRadius) {
        super("square", stroke, fill, id, startX, startY, scaleX, strokeWidth, rotation);
        this.length = length;
        this.cornerRadius = cornerRadius;

    }

    public Square() {}


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
}
