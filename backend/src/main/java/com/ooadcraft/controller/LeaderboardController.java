package com.ooadcraft.controller;

import com.ooadcraft.dto.LeaderboardEntryDto;
import com.ooadcraft.model.User;
import com.ooadcraft.repository.UserRepository;
import com.ooadcraft.service.LeaderboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/leaderboard")
public class LeaderboardController {

    @Autowired
    private LeaderboardService leaderboardService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/global")
    public ResponseEntity<List<LeaderboardEntryDto>> getGlobalLeaderboard() {
        return ResponseEntity.ok(leaderboardService.getGlobalLeaderboard());
    }

    @GetMapping("/university")
    public ResponseEntity<List<LeaderboardEntryDto>> getUniversityLeaderboard(@RequestParam(required = false) String university) {
        if (university == null || university.isEmpty()) {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.isAuthenticated() && !auth.getPrincipal().equals("anonymousUser")) {
                Optional<User> uOpt = userRepository.findByEmail(auth.getName());
                if (uOpt.isPresent()) {
                    university = uOpt.get().getUniversity();
                }
            }
        }
        return ResponseEntity.ok(leaderboardService.getUniversityLeaderboard(university));
    }

    @GetMapping("/department")
    public ResponseEntity<List<LeaderboardEntryDto>> getDepartmentLeaderboard(@RequestParam(required = false) String department) {
        if (department == null || department.isEmpty()) {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.isAuthenticated() && !auth.getPrincipal().equals("anonymousUser")) {
                Optional<User> uOpt = userRepository.findByEmail(auth.getName());
                if (uOpt.isPresent()) {
                    department = uOpt.get().getDepartment();
                }
            }
        }
        return ResponseEntity.ok(leaderboardService.getDepartmentLeaderboard(department));
    }

    @GetMapping("/batch")
    public ResponseEntity<List<LeaderboardEntryDto>> getBatchLeaderboard(@RequestParam(required = false) Integer batchYear) {
        if (batchYear == null) {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.isAuthenticated() && !auth.getPrincipal().equals("anonymousUser")) {
                Optional<User> uOpt = userRepository.findByEmail(auth.getName());
                if (uOpt.isPresent()) {
                    batchYear = uOpt.get().getBatchYear();
                }
            }
        }
        return ResponseEntity.ok(leaderboardService.getBatchLeaderboard(batchYear));
    }
}
