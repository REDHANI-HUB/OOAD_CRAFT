package com.ooadcraft.controller;

import com.ooadcraft.model.DesignChallenge;
import com.ooadcraft.model.User;
import com.ooadcraft.repository.DesignChallengeRepository;
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
@RequestMapping("/api/challenges")
public class ChallengeController {

    @Autowired
    private DesignChallengeRepository challengeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private XPService xpService;

    @GetMapping
    public ResponseEntity<List<DesignChallenge>> getAllChallenges() {
        return ResponseEntity.ok(challengeRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DesignChallenge> getChallengeById(@PathVariable Long id) {
        return challengeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<?> submitChallenge(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(401).build();
        }

        DesignChallenge challenge = challengeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Challenge not found"));

        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        int xpAwarded = challenge.getXpReward();
        xpService.awardXP(user, "CHALLENGE", challenge.getId(), xpAwarded, "Completed Challenge: " + challenge.getTitle());

        Map<String, Object> result = new HashMap<>();
        result.put("message", "Challenge submitted successfully!");
        result.put("xpEarned", xpAwarded);
        result.put("passed", true);
        return ResponseEntity.ok(result);
    }
}
