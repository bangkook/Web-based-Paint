package com.example.Paint.model;

//Triangle is represented using 3 points --> if coordinates better to be used, convert them to x1, y1, x2, y2, x3, y3--> to be represented as polygon in thr front-end
public class Triangle extends Shape {
    private float radius;
    private float cornerRadius;

    public Triangle(float radius, String stroke, String fill, int id,
                    float startX, float startY, float strokeWidth, float rotation, float cornerRadius) {
        super("triangle", stroke, fill, id, startX, startY, strokeWidth, rotation);
        this.radius = radius;
        this.cornerRadius = cornerRadius;

    }

    public float getRadius() {
        return radius;
    }

    public void setRadius(float radius) {
        this.radius = radius;
    }

    public float getCornerRadius() {
        return cornerRadius;
    }

    public void setCornerRadius(float cornerRadius) {
        this.cornerRadius = cornerRadius;
    }
}
