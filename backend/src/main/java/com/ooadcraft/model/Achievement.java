package com.ooadcraft.model;

import jakarta.persistence.*;

@Entity
@Table(name = "achievements")
public class Achievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String iconName;

    private String category;

    private String reqType;

    private int reqValue;

    public Achievement() {}

    public Achievement(String title, String description, String iconName, String category, String reqType, int reqValue) {
        this.title = title;
        this.description = description;
        this.iconName = iconName;
        this.category = category;
        this.reqType = reqType;
        this.reqValue = reqValue;
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

    public String getIconName() {
        return iconName;
    }

    public void setIconName(String iconName) {
        this.iconName = iconName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getReqType() {
        return reqType;
    }

    public void setReqType(String reqType) {
        this.reqType = reqType;
    }

    public int getReqValue() {
        return reqValue;
    }

    public void setReqValue(int reqValue) {
        this.reqValue = reqValue;
    }
}
