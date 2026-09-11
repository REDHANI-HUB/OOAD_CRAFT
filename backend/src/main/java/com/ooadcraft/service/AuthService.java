package com.ooadcraft.service;

import com.ooadcraft.dto.LoginRequest;
import com.ooadcraft.dto.RegisterRequest;
import com.ooadcraft.dto.UserDto;
import com.ooadcraft.model.Profile;
import com.ooadcraft.model.User;
import com.ooadcraft.repository.ProfileRepository;
import com.ooadcraft.repository.UserRepository;
import com.ooadcraft.security.JwtUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthService(UserRepository userRepository, ProfileRepository profileRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @Transactional
    public UserDto register(RegisterRequest request, HttpServletResponse response) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already registered");
        }

        User user = new User(
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                request.getName() != null ? request.getName() : request.getEmail().split("@")[0],
                request.getUniversity() != null ? request.getUniversity() : "State University",
                request.getDepartment() != null ? request.getDepartment() : "Computer Science",
                request.getBatchYear() != null ? request.getBatchYear() : 2026
        );

        User savedUser = userRepository.save(user);
        profileRepository.save(new Profile(savedUser));

        setJwtCookie(response, savedUser.getEmail());
        return mapToUserDto(savedUser);
    }

    @Transactional
    public UserDto login(LoginRequest request, HttpServletResponse response) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        setJwtCookie(response, user.getEmail());
        return mapToUserDto(user);
    }

    public void logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", null);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    public UserDto getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return mapToUserDto(user);
    }

    private UserDto mapToUserDto(User user) {
        return new UserDto(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getUniversity(),
                user.getDepartment(),
                user.getBatchYear(),
                user.getRole()
        );
    }

    private void setJwtCookie(HttpServletResponse response, String email) {
        String token = jwtUtils.generateTokenFromEmail(email);
        Cookie cookie = new Cookie("jwt", token);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(86400); // 24 hours
        response.addCookie(cookie);
    }
}
