package com.example.Paint.model;

public class Point {
    private float x;
    private float y;
    private int key;
    private Shape shape;

    public Point(float x, float y) {
        this.x = x;
        this.y = y;
    }
    
    public Point(int key, Shape shape) {
    	this.key = key;
    	this.shape = shape;
    }
    
    public Point() { }
    
    public int getKey() {
    	return this.key;
    }
    
    public void setKey(int key) {
    	this.key = key;
    }
    
    public Shape getShape() {
    	return this.shape;
    }
    
    public void setShape(Shape shape) {
    	this.shape = shape;
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
