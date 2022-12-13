package com.example.Paint.model;


public class Line extends Shape {
    private float endX, endY;

    public Line(float endX, float endY, String stroke, String fill, int id,
                float startX, float startY, float scaleX, float strokeWidth, float rotation) {
        super("line", stroke, fill, id, startX, startY, scaleX, strokeWidth, rotation);
        this.endX = endX;
        this.endY = endY;
    }

    public Line() {}

    public float getEndX() {
        return endX;
    }

    public void setEndX(float endX) {
        this.endX = endX;
    }

    public float getEndY() {
        return endY;
    }

    public void setEndY(float endY) {
        this.endY = endY;
    }
}
