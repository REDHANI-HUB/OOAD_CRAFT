package com.ooadcraft.dto;

import java.util.List;

public class DashboardSummaryDto {
    private UserDto user;
    private ProfileDto profile;
    private RankCardDto universityRank;
    private RankCardDto batchRank;
    private RankCardDto departmentRank;
    private RankCardDto globalRank;
    private int xpToNextLevel;
    private double levelProgressPercentage;
    private int lecturesCompleted;
    private int testsCompleted;
    private int umlChallengesCompleted;
    private int caseStudiesCompleted;
    private NextLessonDto nextLesson;
    private List<ActivityDto> recentActivities;

    public DashboardSummaryDto() {}

    public DashboardSummaryDto(UserDto user, ProfileDto profile, RankCardDto universityRank, RankCardDto batchRank, RankCardDto departmentRank, RankCardDto globalRank, int xpToNextLevel, double levelProgressPercentage, int lecturesCompleted, int testsCompleted, int umlChallengesCompleted, int caseStudiesCompleted, NextLessonDto nextLesson, List<ActivityDto> recentActivities) {
        this.user = user;
        this.profile = profile;
        this.universityRank = universityRank;
        this.batchRank = batchRank;
        this.departmentRank = departmentRank;
        this.globalRank = globalRank;
        this.xpToNextLevel = xpToNextLevel;
        this.levelProgressPercentage = levelProgressPercentage;
        this.lecturesCompleted = lecturesCompleted;
        this.testsCompleted = testsCompleted;
        this.umlChallengesCompleted = umlChallengesCompleted;
        this.caseStudiesCompleted = caseStudiesCompleted;
        this.nextLesson = nextLesson;
        this.recentActivities = recentActivities;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public ProfileDto getProfile() {
        return profile;
    }

    public void setProfile(ProfileDto profile) {
        this.profile = profile;
    }

    public RankCardDto getUniversityRank() {
        return universityRank;
    }

    public void setUniversityRank(RankCardDto universityRank) {
        this.universityRank = universityRank;
    }

    public RankCardDto getBatchRank() {
        return batchRank;
    }

    public void setBatchRank(RankCardDto batchRank) {
        this.batchRank = batchRank;
    }

    public RankCardDto getDepartmentRank() {
        return departmentRank;
    }

    public void setDepartmentRank(RankCardDto departmentRank) {
        this.departmentRank = departmentRank;
    }

    public RankCardDto getGlobalRank() {
        return globalRank;
    }

    public void setGlobalRank(RankCardDto globalRank) {
        this.globalRank = globalRank;
    }

    public int getXpToNextLevel() {
        return xpToNextLevel;
    }

    public void setXpToNextLevel(int xpToNextLevel) {
        this.xpToNextLevel = xpToNextLevel;
    }

    public double getLevelProgressPercentage() {
        return levelProgressPercentage;
    }

    public void setLevelProgressPercentage(double levelProgressPercentage) {
        this.levelProgressPercentage = levelProgressPercentage;
    }

    public int getLecturesCompleted() {
        return lecturesCompleted;
    }

    public void setLecturesCompleted(int lecturesCompleted) {
        this.lecturesCompleted = lecturesCompleted;
    }

    public int getTestsCompleted() {
        return testsCompleted;
    }

    public void setTestsCompleted(int testsCompleted) {
        this.testsCompleted = testsCompleted;
    }

    public int getUmlChallengesCompleted() {
        return umlChallengesCompleted;
    }

    public void setUmlChallengesCompleted(int umlChallengesCompleted) {
        this.umlChallengesCompleted = umlChallengesCompleted;
    }

    public int getCaseStudiesCompleted() {
        return caseStudiesCompleted;
    }

    public void setCaseStudiesCompleted(int caseStudiesCompleted) {
        this.caseStudiesCompleted = caseStudiesCompleted;
    }

    public NextLessonDto getNextLesson() {
        return nextLesson;
    }

    public void setNextLesson(NextLessonDto nextLesson) {
        this.nextLesson = nextLesson;
    }

    public List<ActivityDto> getRecentActivities() {
        return recentActivities;
    }

    public void setRecentActivities(List<ActivityDto> recentActivities) {
        this.recentActivities = recentActivities;
    }
}
