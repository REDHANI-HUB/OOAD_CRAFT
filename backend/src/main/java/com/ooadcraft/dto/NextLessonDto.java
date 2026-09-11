package com.ooadcraft.dto;

public class NextLessonDto {
    private Long id;
    private Long moduleId;
    private String moduleTitle;
    private String lessonTitle;
    private double progressPercentage;

    public NextLessonDto() {}

    public NextLessonDto(Long id, Long moduleId, String moduleTitle, String lessonTitle, double progressPercentage) {
        this.id = id;
        this.moduleId = moduleId;
        this.moduleTitle = moduleTitle;
        this.lessonTitle = lessonTitle;
        this.progressPercentage = progressPercentage;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getModuleId() {
        return moduleId;
    }

    public void setModuleId(Long moduleId) {
        this.moduleId = moduleId;
    }

    public String getModuleTitle() {
        return moduleTitle;
    }

    public void setModuleTitle(String moduleTitle) {
        this.moduleTitle = moduleTitle;
    }

    public String getLessonTitle() {
        return lessonTitle;
    }

    public void setLessonTitle(String lessonTitle) {
        this.lessonTitle = lessonTitle;
    }

    public double getProgressPercentage() {
        return progressPercentage;
    }

    public void setProgressPercentage(double progressPercentage) {
        this.progressPercentage = progressPercentage;
    }
}
