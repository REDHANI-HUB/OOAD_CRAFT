package com.ooadcraft.model;

import jakarta.persistence.*;

@Entity
@Table(name = "design_patterns")
public class DesignPattern {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category; // CREATIONAL, STRUCTURAL, BEHAVIORAL

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String problem;

    @Column(columnDefinition = "TEXT")
    private String solution;

    @Column(columnDefinition = "LONGTEXT")
    private String javaCode;

    @Column(columnDefinition = "LONGTEXT")
    private String pythonCode;

    @Column(columnDefinition = "LONGTEXT")
    private String cppCode;

    public DesignPattern() {}

    public DesignPattern(String category, String name, String problem, String solution, String javaCode, String pythonCode, String cppCode) {
        this.category = category;
        this.name = name;
        this.problem = problem;
        this.solution = solution;
        this.javaCode = javaCode;
        this.pythonCode = pythonCode;
        this.cppCode = cppCode;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProblem() {
        return problem;
    }

    public void setProblem(String problem) {
        this.problem = problem;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

    public String getJavaCode() {
        return javaCode;
    }

    public void setJavaCode(String javaCode) {
        this.javaCode = javaCode;
    }

    public String getPythonCode() {
        return pythonCode;
    }

    public void setPythonCode(String pythonCode) {
        this.pythonCode = pythonCode;
    }

    public String getCppCode() {
        return cppCode;
    }

    public void setCppCode(String cppCode) {
        this.cppCode = cppCode;
    }
}
