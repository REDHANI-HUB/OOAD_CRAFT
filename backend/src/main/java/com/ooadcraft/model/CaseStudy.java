package com.ooadcraft.model;

import jakarta.persistence.*;

@Entity
@Table(name = "case_studies")
public class CaseStudy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String industry;

    @Column(columnDefinition = "LONGTEXT")
    private String stepsJson;

    private int xpReward = 300;

    public CaseStudy() {}

    public CaseStudy(String title, String description, String industry, String stepsJson, int xpReward) {
        this.title = title;
        this.description = description;
        this.industry = industry;
        this.stepsJson = stepsJson;
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

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getStepsJson() {
        return stepsJson;
    }

    public void setStepsJson(String stepsJson) {
        this.stepsJson = stepsJson;
    }

    public int getXpReward() {
        return xpReward;
    }

    public void setXpReward(int xpReward) {
        this.xpReward = xpReward;
    }
}
