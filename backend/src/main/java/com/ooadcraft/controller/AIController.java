package com.ooadcraft.controller;

import com.ooadcraft.service.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AIController {

    @Autowired
    private AIService aiService;

    @PostMapping("/explain")
    public ResponseEntity<Map<String, Object>> explainConcept(@RequestBody Map<String, String> body) {
        String concept = body.getOrDefault("concept", "SOLID Principles");
        return ResponseEntity.ok(aiService.explainConcept(concept));
    }

    @PostMapping("/review-design")
    public ResponseEntity<Map<String, Object>> reviewDesign(@RequestBody Map<String, String> body) {
        String designJson = body.getOrDefault("designJson", "{}");
        return ResponseEntity.ok(aiService.reviewDesign(designJson));
    }

    @PostMapping("/viva/start")
    public ResponseEntity<Map<String, Object>> startViva(@RequestBody Map<String, String> body) {
        String topic = body.getOrDefault("topic", "UML & SOLID");
        return ResponseEntity.ok(aiService.startVivaSession(topic));
    }

    @PostMapping("/viva/respond")
    public ResponseEntity<Map<String, Object>> respondViva(@RequestBody Map<String, String> body) {
        String answer = body.getOrDefault("answer", "");
        return ResponseEntity.ok(aiService.evaluateVivaAnswer(answer));
    }
}
