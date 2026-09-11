package com.ooadcraft.dto;

import java.util.Map;

public class QuizSubmitResponse {
    private double score;
    private boolean passed;
    private int totalQuestions;
    private int correctAnswers;
    private int xpEarned;
    private Map<Long, String> explanations;

    public QuizSubmitResponse() {}

    public QuizSubmitResponse(double score, boolean passed, int totalQuestions, int correctAnswers, int xpEarned, Map<Long, String> explanations) {
        this.score = score;
        this.passed = passed;
        this.totalQuestions = totalQuestions;
        this.correctAnswers = correctAnswers;
        this.xpEarned = xpEarned;
        this.explanations = explanations;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public boolean isPassed() {
        return passed;
    }

    public void setPassed(boolean passed) {
        this.passed = passed;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public int getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(int correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public int getXpEarned() {
        return xpEarned;
    }

    public void setXpEarned(int xpEarned) {
        this.xpEarned = xpEarned;
    }

    public Map<Long, String> getExplanations() {
        return explanations;
    }

    public void setExplanations(Map<Long, String> explanations) {
        this.explanations = explanations;
    }
}
