package model;

public class Point {
    float x;
    float y;

    Point(float x, float y) {
        this.x = x;
        this.y = y;
    }

    public void show() {
        System.out.println("(" + x + ", " + y + ")");
    }

}
