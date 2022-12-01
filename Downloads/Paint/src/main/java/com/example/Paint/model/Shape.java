package com.example.Paint.model;

import java.awt.*;

public abstract class Shape implements Cloneable {
    public Color color;
    public Point startPoint;
    public ShapeType type;

    public Object clone() {
        try {
            return super.clone();
        } catch (CloneNotSupportedException e) {
            throw new InternalError();
        }
    }
}
