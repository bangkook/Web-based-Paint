package com.example.Paint.model;

public class Circle extends Shape {
    private float radius;

    public Circle(float centreX, float centreY, float radius) {
        startPoint = new Point(centreX, centreY);
        this.radius = radius;
        this.type = "circle";
    }

    /*Circle(float centreX, float centreY, float endX, float endY) {
        startPoint = new Point(centreX, centreY);
        this.radius = (float) Math.sqrt((endY - centreY) * (endY - centreY) + (endX - centreX) * (endX - centreX));
    }*/

    public float getRadius() {
        return radius;
    }

    public void setRadius(float radius) {
        this.radius = radius;
    }
}
