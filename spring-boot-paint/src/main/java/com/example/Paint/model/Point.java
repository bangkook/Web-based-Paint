package com.example.Paint.model;

public class Point {
    float x;
    float y;

    Point(float x, float y) {
        this.x = x;
        this.y = y;
    }

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }

    public void show() {
        System.out.println("(" + x + ", " + y + ")");
    }

}
