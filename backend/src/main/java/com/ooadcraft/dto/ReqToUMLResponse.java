package com.ooadcraft.dto;

import java.util.List;

public class ReqToUMLResponse {
    private List<String> actors;
    private List<String> useCases;
    private List<String> candidateClasses;
    private List<String> relationships;
    private String classDiagramJson;

    public ReqToUMLResponse() {}

    public ReqToUMLResponse(List<String> actors, List<String> useCases, List<String> candidateClasses, List<String> relationships, String classDiagramJson) {
        this.actors = actors;
        this.useCases = useCases;
        this.candidateClasses = candidateClasses;
        this.relationships = relationships;
        this.classDiagramJson = classDiagramJson;
    }

    public List<String> getActors() {
        return actors;
    }

    public void setActors(List<String> actors) {
        this.actors = actors;
    }

    public List<String> getUseCases() {
        return useCases;
    }

    public void setUseCases(List<String> useCases) {
        this.useCases = useCases;
    }

    public List<String> getCandidateClasses() {
        return candidateClasses;
    }

    public void setCandidateClasses(List<String> candidateClasses) {
        this.candidateClasses = candidateClasses;
    }

    public List<String> getRelationships() {
        return relationships;
    }

    public void setRelationships(List<String> relationships) {
        this.relationships = relationships;
    }

    public String getClassDiagramJson() {
        return classDiagramJson;
    }

    public void setClassDiagramJson(String classDiagramJson) {
        this.classDiagramJson = classDiagramJson;
    }
}
