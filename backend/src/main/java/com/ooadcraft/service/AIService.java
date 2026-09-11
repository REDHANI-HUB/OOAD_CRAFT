package com.ooadcraft.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AIService {

    public Map<String, Object> explainConcept(String concept) {
        Map<String, Object> res = new HashMap<>();
        res.put("concept", concept);
        res.put("explanation", "In Object-Oriented Analysis & Design, " + concept + " encapsulates structural and behavioral design principles to achieve high cohesion and low coupling.");
        res.put("analogy", "Think of " + concept + " like a real-world contract where internal implementation details are shielded from consumer modules.");
        res.put("keyTakeaway", "Always design for flexibility and extendability using interface contracts.");
        return res;
    }

    public Map<String, Object> reviewDesign(String designJson) {
        Map<String, Object> res = new HashMap<>();
        res.put("score", 88);
        res.put("strengths", "Good identification of core domain entities and clear association cardinality.");
        res.put("suggestions", "Consider applying the Strategy Pattern to decouple dynamic algorithms from the primary context class.");
        return res;
    }

    public Map<String, Object> startVivaSession(String topic) {
        Map<String, Object> res = new HashMap<>();
        res.put("sessionId", System.currentTimeMillis());
        res.put("topic", topic);
        res.put("initialQuestion", "Explain the key differences between Aggregation and Composition relationships in UML class diagrams, and give a real-world example of each.");
        return res;
    }

    public Map<String, Object> evaluateVivaAnswer(String answer) {
        Map<String, Object> res = new HashMap<>();
        res.put("score", 90);
        res.put("feedback", "Excellent response! You correctly identified that Composition implies strong lifecycle ownership while Aggregation represents a looser HAS-A relationship.");
        res.put("nextQuestion", "Follow-up question: How does the Liskov Substitution Principle (LSP) relate to class inheritance hierarchies?");
        return res;
    }
}
