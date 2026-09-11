package com.ooadcraft.dto;

public class LeaderboardEntryDto {
    private int rank;
    private Long userId;
    private String name;
    private String university;
    private String department;
    private Integer batchYear;
    private int totalXP;
    private int level;
    private String avatar;
    private int streak;

    public LeaderboardEntryDto() {}

    public LeaderboardEntryDto(int rank, Long userId, String name, String university, String department, Integer batchYear, int totalXP, int level, String avatar, int streak) {
        this.rank = rank;
        this.userId = userId;
        this.name = name;
        this.university = university;
        this.department = department;
        this.batchYear = batchYear;
        this.totalXP = totalXP;
        this.level = level;
        this.avatar = avatar;
        this.streak = streak;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getBatchYear() {
        return batchYear;
    }

    public void setBatchYear(Integer batchYear) {
        this.batchYear = batchYear;
    }

    public int getTotalXP() {
        return totalXP;
    }

    public void setTotalXP(int totalXP) {
        this.totalXP = totalXP;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public int getStreak() {
        return streak;
    }

    public void setStreak(int streak) {
        this.streak = streak;
    }
}
