package com.example.Paint.model;

public class Pen extends Shape {
    private Point[] points = new Point[1000];
    private int index = 0;

    public Pen(float x, float y) {
        this.startPoint = new Point(x, y);
        this.type = ShapeType.PEN;
    }

    public boolean addPoints(Point[] points) {
        if (index >= 1000) return false;

        for (Point point : points) {
            this.points[index++] = new Point(point.x, point.y);
        }
        return true;
    }

    public Point[] getPoints() {
        return points;
    }

    public void setPoints(Point[] points) {
        this.points = points;
    }
}
