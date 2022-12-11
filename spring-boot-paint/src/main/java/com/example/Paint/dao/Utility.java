package com.example.Paint.dao;

import javax.swing.*;
import javax.swing.filechooser.FileNameExtensionFilter;
import java.awt.*;
import java.io.File;
import java.io.IOException;

public class Utility {
    private String filePath, extension;

    public void saveFile() throws IOException {
        System.setProperty("java.awt.headless", "false");

        // parent component of the dialog
        JFrame parentFrame = new JFrame();
        parentFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        parentFrame.setSize(800, 600);
        parentFrame.setVisible(true);
        JFileChooser fileChooser = new JFileChooser();
        fileChooser.setPreferredSize(new Dimension(800, 600));
        fileChooser.setVisible(true);
        parentFrame.setAlwaysOnTop(true);
        fileChooser.setDialogTitle("Specify a file to save");
        fileChooser.addChoosableFileFilter(new FileNameExtensionFilter(".json", "json"));
        fileChooser.addChoosableFileFilter(new FileNameExtensionFilter(".xml", "xml"));
        fileChooser.removeChoosableFileFilter(fileChooser.getAcceptAllFileFilter());

        int userSelection = fileChooser.showSaveDialog(parentFrame);

        if (userSelection == JFileChooser.APPROVE_OPTION) {
            File fileToSave = fileChooser.getSelectedFile();
            this.extension = fileChooser.getFileFilter().getDescription();
            this.filePath = fileToSave.getCanonicalPath();
            parentFrame.remove(fileChooser);
            System.out.println("Save as file: " + fileToSave.getAbsolutePath());
        } else if (userSelection == JFileChooser.CANCEL_OPTION) {
            this.filePath = null;
            parentFrame.remove(fileChooser);
        }
    }

    public void loadFile() throws IOException {
        System.setProperty("java.awt.headless", "false");

        // parent component of the dialog
        JFrame parentFrame = new JFrame();
        parentFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        parentFrame.setSize(800, 600);
        parentFrame.setVisible(true);
        JFileChooser fileChooser = new JFileChooser();
        fileChooser.setPreferredSize(new Dimension(800, 600));
        fileChooser.setVisible(true);
        parentFrame.setAlwaysOnTop(true);
        fileChooser.setDialogTitle("Specify a file to load");
        fileChooser.addChoosableFileFilter(new FileNameExtensionFilter(".json", "json"));
        fileChooser.addChoosableFileFilter(new FileNameExtensionFilter(".xml", "xml"));
        fileChooser.removeChoosableFileFilter(fileChooser.getAcceptAllFileFilter());

        int userSelection = fileChooser.showOpenDialog(parentFrame);

        if (userSelection == JFileChooser.APPROVE_OPTION) {
            File fileToLoad = fileChooser.getSelectedFile();
            this.extension = fileChooser.getFileFilter().getDescription();
            this.filePath = fileToLoad.getCanonicalPath();
            parentFrame.remove(fileChooser);
            fileChooser.setVisible(false);
            System.out.println("load file: " + fileToLoad.getAbsolutePath());
        } else if (userSelection == JFileChooser.CANCEL_OPTION) {
            fileChooser.setVisible(false);
            this.filePath = null;
            parentFrame.remove(fileChooser);
        }
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }
}
