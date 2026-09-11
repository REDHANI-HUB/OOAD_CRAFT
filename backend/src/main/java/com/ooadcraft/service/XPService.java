package com.ooadcraft.service;

import com.ooadcraft.model.*;
import com.ooadcraft.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class XPService {

    private final ProfileRepository profileRepository;
    private final XPTransactionRepository transactionRepository;
    private final ActivityRepository activityRepository;

    public XPService(ProfileRepository profileRepository,
                     XPTransactionRepository transactionRepository,
                     ActivityRepository activityRepository) {
        this.profileRepository = profileRepository;
        this.transactionRepository = transactionRepository;
        this.activityRepository = activityRepository;
    }

    @Transactional
    public void awardXP(User user, String activityType, Long referenceId, int amount, String description) {
        // Prevent duplicate XP awards for the same repeatable activity
        if (referenceId != null && transactionRepository.existsByUserIdAndActivityTypeAndReferenceId(user.getId(), activityType, referenceId)) {
            return;
        }

        Profile profile = profileRepository.findByUserId(user.getId())
                .orElseGet(() -> profileRepository.save(new Profile(user)));

        int newTotalXP = profile.getTotalXP() + amount;
        profile.setTotalXP(newTotalXP);
        profile.setCurrentLevel(calculateLevel(newTotalXP));
        profileRepository.save(profile);

        transactionRepository.save(new XPTransaction(user, activityType, referenceId, amount, description));
        activityRepository.save(new Activity(user, description, activityType, amount));
    }

    public int calculateLevel(int totalXP) {
        if (totalXP < 500) return 1;       // Beginner
        if (totalXP < 1200) return 2;      // OOP Explorer
        if (totalXP < 2200) return 3;      // UML Learner
        if (totalXP < 3500) return 4;      // UML Designer
        if (totalXP < 5000) return 5;      // OO Analyst
        if (totalXP < 7000) return 6;      // OO Designer
        if (totalXP < 9500) return 7;      // Pattern Apprentice
        if (totalXP < 12500) return 8;     // Software Architect
        if (totalXP < 16000) return 9;     // Design Expert
        return 10;                         // OOAD Master
    }

    public String getLevelTitle(int level) {
        return switch (level) {
            case 1 -> "Beginner";
            case 2 -> "OOP Explorer";
            case 3 -> "UML Learner";
            case 4 -> "UML Designer";
            case 5 -> "OO Analyst";
            case 6 -> "OO Designer";
            case 7 -> "Pattern Apprentice";
            case 8 -> "Software Architect";
            case 9 -> "Design Expert";
            case 10 -> "OOAD Master";
            default -> "OOAD Scholar";
        };
    }
}
