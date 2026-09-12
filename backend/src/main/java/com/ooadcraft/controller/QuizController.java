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
    public ResponseEntity<?> getQuizByModuleId(@PathVariable Long moduleId) {
        Quiz quiz = quizService.getQuizByModuleId(moduleId);
        if (quiz == null) {
            return ResponseEntity.status(404).body("No quiz found for module " + moduleId);
        }
        return ResponseEntity.ok(quiz);
    }

    @Autowired
    private com.ooadcraft.repository.UserRepository userRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createQuiz(@RequestBody Quiz quiz) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(401).body("Authentication required");
        }
        com.ooadcraft.model.User user = userRepository.findByEmail(auth.getName()).orElse(null);
        if (user == null) {
            return ResponseEntity.status(401).body("User not found");
        }
        String role = user.getRole() != null ? user.getRole().toUpperCase() : "";
        if (!role.contains("STAFF") && !role.contains("PROFESSOR") && !role.contains("TEACHER") && !role.contains("ADMIN")) {
            return ResponseEntity.status(403).body("Only Staff/Faculty members are authorized to create quizzes");
        }
        Quiz created = quizService.createQuiz(quiz);
        return ResponseEntity.ok(created);
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
