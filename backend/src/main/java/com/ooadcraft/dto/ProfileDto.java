package com.ooadcraft.dto;

public class ProfileDto {
    private Long id;
    private Long userId;
    private String avatar;
    private String bio;
    private int totalXP;
    private int currentLevel;
    private String levelTitle;
    private int currentStreak;
    private int globalRank;
    private int universityRank;
    private int departmentRank;
    private int batchRank;

    public ProfileDto() {}

    public ProfileDto(Long id, Long userId, String avatar, String bio, int totalXP, int currentLevel, String levelTitle, int currentStreak, int globalRank, int universityRank, int departmentRank, int batchRank) {
        this.id = id;
        this.userId = userId;
        this.avatar = avatar;
        this.bio = bio;
        this.totalXP = totalXP;
        this.currentLevel = currentLevel;
        this.levelTitle = levelTitle;
        this.currentStreak = currentStreak;
        this.globalRank = globalRank;
        this.universityRank = universityRank;
        this.departmentRank = departmentRank;
        this.batchRank = batchRank;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public int getTotalXP() {
        return totalXP;
    }

    public void setTotalXP(int totalXP) {
        this.totalXP = totalXP;
    }

    public int getCurrentLevel() {
        return currentLevel;
    }

    public void setCurrentLevel(int currentLevel) {
        this.currentLevel = currentLevel;
    }

    public String getLevelTitle() {
        return levelTitle;
    }

    public void setLevelTitle(String levelTitle) {
        this.levelTitle = levelTitle;
    }

    public int getCurrentStreak() {
        return currentStreak;
    }

    public void setCurrentStreak(int currentStreak) {
        this.currentStreak = currentStreak;
    }

    public int getGlobalRank() {
        return globalRank;
    }

    public void setGlobalRank(int globalRank) {
        this.globalRank = globalRank;
    }

    public int getUniversityRank() {
        return universityRank;
    }

    public void setUniversityRank(int universityRank) {
        this.universityRank = universityRank;
    }

    public int getDepartmentRank() {
        return departmentRank;
    }

    public void setDepartmentRank(int departmentRank) {
        this.departmentRank = departmentRank;
    }

    public int getBatchRank() {
        return batchRank;
    }

    public void setBatchRank(int batchRank) {
        this.batchRank = batchRank;
    }
}
