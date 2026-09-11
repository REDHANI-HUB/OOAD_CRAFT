package com.ooadcraft.dto;

import java.util.List;

public class UMLValidationResponse {
    private int score;
    private boolean isValid;
    private List<String> warnings;

    public UMLValidationResponse() {}

    public UMLValidationResponse(int score, boolean isValid, List<String> warnings) {
        this.score = score;
        this.isValid = isValid;
        this.warnings = warnings;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public boolean isValid() {
        return isValid;
    }

    public void setValid(boolean valid) {
        isValid = valid;
    }

    public List<String> getWarnings() {
        return warnings;
    }

    public void setWarnings(List<String> warnings) {
        this.warnings = warnings;
    }
}
