package com.ooadcraft.controller;

import com.ooadcraft.model.Lesson;
import com.ooadcraft.model.Module;
import com.ooadcraft.service.CurriculumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ModuleController {

    @Autowired
    private CurriculumService curriculumService;

    @GetMapping("/modules")
    public ResponseEntity<List<Module>> getAllModules() {
        return ResponseEntity.ok(curriculumService.getAllModules());
    }

    @GetMapping("/modules/{id}")
    public ResponseEntity<Module> getModuleById(@PathVariable Long id) {
        return ResponseEntity.ok(curriculumService.getModuleById(id));
    }

    @GetMapping("/lessons/{id}")
    public ResponseEntity<Lesson> getLessonById(@PathVariable Long id) {
        return ResponseEntity.ok(curriculumService.getLessonById(id));
    }

    @PostMapping("/lessons/{id}/complete")
    public ResponseEntity<?> completeLesson(@PathVariable Long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        curriculumService.completeLesson(id, auth.getName());
        Map<String, String> res = new HashMap<>();
        res.put("message", "Lesson completed successfully");
        return ResponseEntity.ok(res);
    }
}
