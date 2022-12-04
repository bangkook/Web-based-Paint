package com.example.Paint.model;

//Triangle is represented using 3 points --> if coordinates better to be used, convert them to x1, y1, x2, y2, x3, y3--> to be represented as polygon in thr front-end
public class Triangle extends Shape {
    Point p1, p2, p3;

    public Triangle(Point p1, Point p2, Point p3) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.type = ShapeType.TRIANGLE;
    }

    public void setP1(Point p1) { this.p1 = p1; }

    public void setP2(Point p1) { this.p2 = p2; }

    public void setP3(Point p1) { this.p3 = p3; }

    public Point getP1() { return this.p1; }

    public Point getP2() { return this.p2; }

    public Point getP3() { return this.p3; }

}
