package com.example.Paint.model;

import java.io.Serializable;
import java.beans.JavaBean;
import java.util.ArrayList;

@JavaBean
public class Pen extends Shape implements Serializable{
    ArrayList<Float> points = new ArrayList<Float>();

    public Pen(String stroke, String fill, int id,float startX, 
    		    float startY, float scaleX, float strokeWidth, float rotation, ArrayList<Float> points) {
        super("pen", stroke, fill, id, startX, startY, scaleX, strokeWidth, rotation);
        this.points = points;
    }
    
    public Pen(){}
    
    public ArrayList<Float> getPoints() { return this.points; }
    
    public void serPoints(ArrayList<Float> points) { this.points = points; }
    
}
