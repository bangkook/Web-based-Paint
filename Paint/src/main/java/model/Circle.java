package model;

public class Circle extends Shape {
    private float radius;

    Circle(float centreX, float centreY, float radius) {
        startPoint = new Point(centreX, centreY);
        this.radius = radius;
    }

    Circle(float centreX, float centreY, float endX, float endY) {
        startPoint = new Point(centreX, centreY);
        this.radius = (float) Math.sqrt((endY - centreY) * (endY - centreY) + (endX - centreX) * (endX - centreX));
    }

    public float getRadius() {
        return radius;
    }

    public void setRadius(float radius) {
        this.radius = radius;
    }
}
