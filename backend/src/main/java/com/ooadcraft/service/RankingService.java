package com.ooadcraft.service;

import com.ooadcraft.model.Profile;
import com.ooadcraft.model.User;
import com.ooadcraft.repository.ProfileRepository;
import com.ooadcraft.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
public class RankingService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;

    public RankingService(UserRepository userRepository, ProfileRepository profileRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }

    @Transactional(readOnly = true)
    public int getGlobalRank(Long userId) {
        List<Profile> allProfiles = profileRepository.findAllByOrderByTotalXPDesc();
        for (int i = 0; i < allProfiles.size(); i++) {
            if (allProfiles.get(i).getUser().getId().equals(userId)) {
                return i + 1;
            }
        }
        return 1;
    }

    @Transactional(readOnly = true)
    public int getUniversityRank(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null || user.getUniversity() == null) return 1;

        List<User> univUsers = userRepository.findByUniversity(user.getUniversity());
        List<Profile> profiles = univUsers.stream()
                .map(u -> profileRepository.findByUserId(u.getId()).orElse(null))
                .filter(Objects::nonNull)
                .sorted((p1, p2) -> Integer.compare(p2.getTotalXP(), p1.getTotalXP()))
                .toList();

        for (int i = 0; i < profiles.size(); i++) {
            if (profiles.get(i).getUser().getId().equals(userId)) {
                return i + 1;
            }
        }
        return 1;
    }

    @Transactional(readOnly = true)
    public int getDepartmentRank(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null || user.getDepartment() == null) return 1;

        List<User> deptUsers = userRepository.findByDepartment(user.getDepartment());
        List<Profile> profiles = deptUsers.stream()
                .map(u -> profileRepository.findByUserId(u.getId()).orElse(null))
                .filter(Objects::nonNull)
                .sorted((p1, p2) -> Integer.compare(p2.getTotalXP(), p1.getTotalXP()))
                .toList();

        for (int i = 0; i < profiles.size(); i++) {
            if (profiles.get(i).getUser().getId().equals(userId)) {
                return i + 1;
            }
        }
        return 1;
    }

    @Transactional(readOnly = true)
    public int getBatchRank(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null || user.getBatchYear() == null) return 1;

        List<User> batchUsers = userRepository.findByBatchYear(user.getBatchYear());
        List<Profile> profiles = batchUsers.stream()
                .map(u -> profileRepository.findByUserId(u.getId()).orElse(null))
                .filter(Objects::nonNull)
                .sorted((p1, p2) -> Integer.compare(p2.getTotalXP(), p1.getTotalXP()))
                .toList();

        for (int i = 0; i < profiles.size(); i++) {
            if (profiles.get(i).getUser().getId().equals(userId)) {
                return i + 1;
            }
        }
        return 1;
    }
}
