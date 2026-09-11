package com.ooadcraft.dto;

import java.util.Map;

public class QuizSubmitRequest {
    private Map<Long, Integer> answers;
    private int timeTakenSeconds;

    public QuizSubmitRequest() {}

    public QuizSubmitRequest(Map<Long, Integer> answers, int timeTakenSeconds) {
        this.answers = answers;
        this.timeTakenSeconds = timeTakenSeconds;
    }

    public Map<Long, Integer> getAnswers() {
        return answers;
    }

    public void setAnswers(Map<Long, Integer> answers) {
        this.answers = answers;
    }

    public int getTimeTakenSeconds() {
        return timeTakenSeconds;
    }

    public void setTimeTakenSeconds(int timeTakenSeconds) {
        this.timeTakenSeconds = timeTakenSeconds;
    }
}
