package com.ooadcraft.controller;

import com.ooadcraft.dto.LoginRequest;
import com.ooadcraft.dto.RegisterRequest;
import com.ooadcraft.dto.UserDto;
import com.ooadcraft.security.JwtUtils;
import com.ooadcraft.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request, HttpServletResponse response) {
        try {
            UserDto user = authService.register(request, response);
            String token = jwtUtils.generateTokenFromEmail(user.getEmail());

            Map<String, Object> body = new HashMap<>();
            body.put("user", user);
            body.put("token", token);
            return ResponseEntity.ok(body);
        } catch (Exception e) {
            Map<String, String> err = new HashMap<>();
            err.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(err);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        try {
            UserDto user = authService.login(request, response);
            String token = jwtUtils.generateTokenFromEmail(user.getEmail());

            Map<String, Object> body = new HashMap<>();
            body.put("user", user);
            body.put("token", token);
            return ResponseEntity.ok(body);
        } catch (Exception e) {
            Map<String, String> err = new HashMap<>();
            err.put("message", "Invalid email or password");
            return ResponseEntity.badRequest().body(err);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        authService.logout(response);
        Map<String, String> msg = new HashMap<>();
        msg.put("message", "Logged out successfully");
        return ResponseEntity.ok(msg);
    }

    @GetMapping("/me")
    public ResponseEntity<?> me() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        String email = auth.getName();
        UserDto user = authService.getCurrentUser(email);
        return ResponseEntity.ok(user);
    }
}
