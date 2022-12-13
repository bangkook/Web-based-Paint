package com.example.Paint.model;

public class Circle extends Shape {
    private float radius;

    public Circle(float radius, String stroke, String fill, int id,
                  float startX, float startY, float scaleX, float strokeWidth, float rotation) {
        super("circle", stroke, fill, id, startX, startY, scaleX, strokeWidth, rotation);
        this.radius = radius;
    }

    public Circle() {
        super();
    }

    public float getRadius() {
        return radius;
    }

    public void setRadius(float radius) {
        this.radius = radius;
    }
}
