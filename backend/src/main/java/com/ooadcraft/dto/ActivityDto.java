package com.ooadcraft.dto;

import java.time.LocalDateTime;

public class ActivityDto {
    private Long id;
    private String title;
    private String activityType;
    private int xpEarned;
    private LocalDateTime timestamp;

    public ActivityDto() {}

    public ActivityDto(Long id, String title, String activityType, int xpEarned, LocalDateTime timestamp) {
        this.id = id;
        this.title = title;
        this.activityType = activityType;
        this.xpEarned = xpEarned;
        this.timestamp = timestamp;
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

    public String getActivityType() {
        return activityType;
    }

    public void setActivityType(String activityType) {
        this.activityType = activityType;
    }

    public int getXpEarned() {
        return xpEarned;
    }

    public void setXpEarned(int xpEarned) {
        this.xpEarned = xpEarned;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
