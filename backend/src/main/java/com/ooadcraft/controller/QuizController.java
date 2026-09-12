package com.ooadcraft.controller;

import com.ooadcraft.dto.QuizSubmitRequest;
import com.ooadcraft.dto.QuizSubmitResponse;
import com.ooadcraft.model.Quiz;
import com.ooadcraft.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        return ResponseEntity.ok(quizService.getAllQuizzes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Long id) {
        return ResponseEntity.ok(quizService.getQuizById(id));
    }

    @GetMapping("/module/{moduleId}")
    public ResponseEntity<Quiz> getQuizByModuleId(@PathVariable Long moduleId) {
        return ResponseEntity.ok(quizService.getQuizByModuleId(moduleId));
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<QuizSubmitResponse> submitQuiz(@PathVariable Long id, @RequestBody QuizSubmitRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(401).build();
        }
        QuizSubmitResponse response = quizService.submitQuiz(id, auth.getName(), request);
        return ResponseEntity.ok(response);
    }
}
