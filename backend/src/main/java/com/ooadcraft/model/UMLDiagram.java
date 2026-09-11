package com.ooadcraft.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "uml_diagrams")
public class UMLDiagram {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;

    private String diagramType = "CLASS"; // CLASS, USE_CASE, SEQUENCE, ACTIVITY

    @Column(columnDefinition = "LONGTEXT")
    private String nodesJson;

    @Column(columnDefinition = "LONGTEXT")
    private String edgesJson;

    private boolean isValid = true;

    private int score = 100;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public UMLDiagram() {
        this.updatedAt = LocalDateTime.now();
    }

    public UMLDiagram(User user, String title, String diagramType, String nodesJson, String edgesJson, boolean isValid, int score) {
        this.user = user;
        this.title = title;
        this.diagramType = diagramType;
        this.nodesJson = nodesJson;
        this.edgesJson = edgesJson;
        this.isValid = isValid;
        this.score = score;
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDiagramType() {
        return diagramType;
    }

    public void setDiagramType(String diagramType) {
        this.diagramType = diagramType;
    }

    public String getNodesJson() {
        return nodesJson;
    }

    public void setNodesJson(String nodesJson) {
        this.nodesJson = nodesJson;
    }

    public String getEdgesJson() {
        return edgesJson;
    }

    public void setEdgesJson(String edgesJson) {
        this.edgesJson = edgesJson;
    }

    public boolean isValid() {
        return isValid;
    }

    public void setValid(boolean valid) {
        isValid = valid;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
