package com.example.Paint.model;


public class Line extends Shape {
    private Point endPoint;
    private float length;

    Line(float startX, float startY, float endX, float endY) {
        startPoint = new Point(startX, startY);
        endPoint = new Point(endX, endY);
        length = (float) Math.sqrt((endY - startY) * (endY - startY) + (endX - startX) * (endX - startX));

    }

    /*// draw horizontal line with given length
    Line(float startX, float startY, float length) {
        startPoint = new Point(startX, startY);
        endPoint = new Point(startX, startY + length);
        this.length = length;
    }*/

    public Point getEndPoint() {
        return endPoint;
    }

    public void setEndPoint(Point endPoint) {
        this.endPoint = endPoint;
    }

    public float getLength() {
        return length;
    }

    public void setLength(float length) {
        this.length = length;
    }
}
