package com.example.Paint.model;

public class Ellipse extends Shape {
    private float width;
    private float height;

    public Ellipse(float startX, float startY, float width, float height) {
        startPoint = new Point(startX, startY);
        this.width = width;
        this.height = height;
    }

    public Ellipse(float startX, float startY, float widthX, float widthY, float heightX, float heightY) {
        startPoint = new Point(startX, startY);
        this.width = (float) Math.sqrt((startY - widthY) * (startY - widthY) + (startX - widthX) * (startX - widthX));
        this.height = (float) Math.sqrt((startY - heightY) * (startY - heightY) + (startX - heightX) * (startX - heightX));
    }

    public float getWidth() {
        return width;
    }

    public void setWidth(float width) {
        this.width = width;
    }

    public float getHeight() {
        return height;
    }

    public void setHeight(float height) {
        this.height = height;
    }
}
