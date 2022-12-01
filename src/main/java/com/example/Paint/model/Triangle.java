package com.example.Paint.model;

public class Triangle extends Shape {
    private Point a;
    private Point b;
    private Point c;

    public Triangle(float aX, float aY, float bX, float bY, float cX, float cY) {
        this.a = new Point(aX, aY);
        this.b = new Point(bX, bY);
        this.c = new Point(cX, cY);
    }

    public Point getA() {
        return a;
    }

    public void setA(Point a) {
        this.a = a;
    }

    public Point getB() {
        return b;
    }

    public void setB(Point b) {
        this.b = b;
    }

    public Point getC() {
        return c;
    }

    public void setC(Point c) {
        this.c = c;
    }
}
