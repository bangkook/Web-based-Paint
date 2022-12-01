package model;

public class Rectangle extends Shape {
    private float length;
    private float width;

    public Rectangle(float x, float y, float length, float width) {
        startPoint = new Point(x, y);
        this.length = length;
        this.width = width;
    }

    /*public Rectangle(float x1, float y1, float x2, float y2) {
        startPoint = new Point(x, y);
        this.length = Math.abs(x1 - x2);
        this.width = Math.abs(y1 - y2);
    }*/

    public float getLength() {
        return length;
    }

    public void setLength(float length) {
        this.length = length;
    }

    public float getWidth() {
        return width;
    }

    public void setWidth(float width) {
        this.width = width;
    }
}
