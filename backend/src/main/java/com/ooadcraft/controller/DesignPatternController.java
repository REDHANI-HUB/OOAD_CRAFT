package com.ooadcraft.controller;

import com.ooadcraft.model.DesignPattern;
import com.ooadcraft.repository.DesignPatternRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patterns")
public class DesignPatternController {

    @Autowired
    private DesignPatternRepository patternRepository;

    @GetMapping
    public ResponseEntity<List<DesignPattern>> getAllPatterns() {
        return ResponseEntity.ok(patternRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DesignPattern> getPatternById(@PathVariable Long id) {
        return patternRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<DesignPattern>> getPatternsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(patternRepository.findByCategory(category.toUpperCase()));
    }
}
