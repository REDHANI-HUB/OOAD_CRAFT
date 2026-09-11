package com.ooadcraft.service;

import com.ooadcraft.dto.LeaderboardEntryDto;
import com.ooadcraft.model.Profile;
import com.ooadcraft.model.User;
import com.ooadcraft.repository.ProfileRepository;
import com.ooadcraft.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LeaderboardService {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private UserRepository userRepository;

    public List<LeaderboardEntryDto> getGlobalLeaderboard() {
        List<Profile> profiles = profileRepository.findAllByOrderByTotalXPDesc();
        return mapProfilesToEntries(profiles);
    }

    public List<LeaderboardEntryDto> getUniversityLeaderboard(String university) {
        if (university == null || university.trim().isEmpty()) {
            return getGlobalLeaderboard();
        }
        List<Profile> profiles = profileRepository.findByUniversityOrderByTotalXPDesc(university);
        return mapProfilesToEntries(profiles);
    }

    public List<LeaderboardEntryDto> getDepartmentLeaderboard(String department) {
        if (department == null || department.trim().isEmpty()) {
            return getGlobalLeaderboard();
        }
        List<Profile> profiles = profileRepository.findByDepartmentOrderByTotalXPDesc(department);
        return mapProfilesToEntries(profiles);
    }

    public List<LeaderboardEntryDto> getBatchLeaderboard(Integer batchYear) {
        if (batchYear == null) {
            return getGlobalLeaderboard();
        }
        List<Profile> profiles = profileRepository.findByBatchYearOrderByTotalXPDesc(batchYear);
        return mapProfilesToEntries(profiles);
    }

    private List<LeaderboardEntryDto> mapProfilesToEntries(List<Profile> profiles) {
        List<LeaderboardEntryDto> entries = new ArrayList<>();
        int rank = 1;
        for (Profile p : profiles) {
            User u = p.getUser();
            LeaderboardEntryDto entry = new LeaderboardEntryDto(
                rank++,
                u.getId(),
                u.getName(),
                u.getUniversity(),
                u.getDepartment(),
                u.getBatchYear(),
                p.getTotalXP(),
                p.getCurrentLevel(),
                p.getAvatar(),
                p.getCurrentStreak()
            );
            entries.add(entry);
        }
        return entries;
    }
}
