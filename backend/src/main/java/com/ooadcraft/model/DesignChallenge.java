package com.ooadcraft.model;

import jakarta.persistence.*;

@Entity
@Table(name = "design_challenges")
public class DesignChallenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "LONGTEXT")
    private String scenarioText;

    @Column(columnDefinition = "TEXT")
    private String starterRequirements;

    private String difficulty = "MEDIUM"; // EASY, MEDIUM, HARD

    private int xpReward = 200;

    public DesignChallenge() {}

    public DesignChallenge(String title, String description, String scenarioText, String starterRequirements, String difficulty, int xpReward) {
        this.title = title;
        this.description = description;
        this.scenarioText = scenarioText;
        this.starterRequirements = starterRequirements;
        this.difficulty = difficulty;
        this.xpReward = xpReward;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getScenarioText() {
        return scenarioText;
    }

    public void setScenarioText(String scenarioText) {
        this.scenarioText = scenarioText;
    }

    public String getStarterRequirements() {
        return starterRequirements;
    }

    public void setStarterRequirements(String starterRequirements) {
        this.starterRequirements = starterRequirements;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public int getXpReward() {
        return xpReward;
    }

    public void setXpReward(int xpReward) {
        this.xpReward = xpReward;
    }
}
