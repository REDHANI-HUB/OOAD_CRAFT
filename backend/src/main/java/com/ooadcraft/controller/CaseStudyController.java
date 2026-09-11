package com.ooadcraft.controller;

import com.ooadcraft.model.CaseStudy;
import com.ooadcraft.model.User;
import com.ooadcraft.repository.CaseStudyRepository;
import com.ooadcraft.repository.UserRepository;
import com.ooadcraft.service.XPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/case-studies")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CaseStudyController {

    @Autowired
    private CaseStudyRepository caseStudyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private XPService xpService;

    @GetMapping
    public ResponseEntity<List<CaseStudy>> getAllCaseStudies() {
        return ResponseEntity.ok(caseStudyRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CaseStudy> getCaseStudyById(@PathVariable Long id) {
        return caseStudyRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/step")
    public ResponseEntity<?> submitCaseStudyStep(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(401).build();
        }

        CaseStudy caseStudy = caseStudyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Case study not found"));

        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        boolean isFinalStep = Boolean.TRUE.equals(body.get("isFinalStep"));
        int xpEarned = 50;

        if (isFinalStep) {
            xpEarned = caseStudy.getXpReward();
            xpService.awardXP(user, "CASE_STUDY", caseStudy.getId(), xpEarned, "Completed Case Study: " + caseStudy.getTitle());
        }

        Map<String, Object> result = new HashMap<>();
        result.put("message", "Step saved successfully");
        result.put("xpEarned", xpEarned);
        result.put("completed", isFinalStep);
        return ResponseEntity.ok(result);
    }
}
