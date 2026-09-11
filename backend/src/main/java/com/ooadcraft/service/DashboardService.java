package com.ooadcraft.service;

import com.ooadcraft.dto.*;
import com.ooadcraft.model.*;
import com.ooadcraft.model.Module;
import com.ooadcraft.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final RankingService rankingService;
    private final XPService xpService;
    private final LessonProgressRepository lessonProgressRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final UMLDiagramRepository umlDiagramRepository;
    private final ActivityRepository activityRepository;
    private final ModuleRepository moduleRepository;

    public DashboardService(UserRepository userRepository,
                            ProfileRepository profileRepository,
                            RankingService rankingService,
                            XPService xpService,
                            LessonProgressRepository lessonProgressRepository,
                            QuizAttemptRepository quizAttemptRepository,
                            UMLDiagramRepository umlDiagramRepository,
                            ActivityRepository activityRepository,
                            ModuleRepository moduleRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.rankingService = rankingService;
        this.xpService = xpService;
        this.lessonProgressRepository = lessonProgressRepository;
        this.quizAttemptRepository = quizAttemptRepository;
        this.umlDiagramRepository = umlDiagramRepository;
        this.activityRepository = activityRepository;
        this.moduleRepository = moduleRepository;
    }

    @Transactional(readOnly = true)
    public DashboardSummaryDto getDashboardSummary(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Profile profile = profileRepository.findByUserId(user.getId())
                .orElseGet(() -> new Profile(user));

        UserDto userDto = new UserDto(user.getId(), user.getEmail(), user.getName(), user.getUniversity(), user.getDepartment(), user.getBatchYear(), user.getRole());

        int gRank = rankingService.getGlobalRank(user.getId());
        int uRank = rankingService.getUniversityRank(user.getId());
        int dRank = rankingService.getDepartmentRank(user.getId());
        int bRank = rankingService.getBatchRank(user.getId());

        ProfileDto profileDto = new ProfileDto(
                profile.getId(), user.getId(), profile.getAvatar(), profile.getBio(),
                profile.getTotalXP(), profile.getCurrentLevel(), xpService.getLevelTitle(profile.getCurrentLevel()),
                profile.getCurrentStreak(), gRank, uRank, dRank, bRank
        );

        RankCardDto univCard = new RankCardDto("University Rank", uRank, 1);
        RankCardDto batchCard = new RankCardDto("Batch Rank", bRank, 1);
        RankCardDto deptCard = new RankCardDto("Department Rank", dRank, 1);
        RankCardDto globalCard = new RankCardDto("Global Rank", gRank, 2);

        int level = profile.getCurrentLevel();
        int currentXP = profile.getTotalXP();
        int baseXP = (level == 1) ? 0 : (level == 2 ? 500 : (level == 3 ? 1200 : (level == 4 ? 2200 : (level == 5 ? 3500 : (level == 6 ? 5000 : (level == 7 ? 7000 : (level == 8 ? 9500 : (level == 9 ? 12500 : 16000))))))));
        int targetXP = (level == 1) ? 500 : (level == 2 ? 1200 : (level == 3 ? 2200 : (level == 4 ? 3500 : (level == 5 ? 5000 : (level == 6 ? 7000 : (level == 7 ? 9500 : (level == 8 ? 12500 : (level == 9 ? 16000 : 20000))))))));

        int xpToNext = Math.max(0, targetXP - currentXP);
        double progressPct = Math.min(100.0, Math.max(0.0, ((double) (currentXP - baseXP) / (targetXP - baseXP)) * 100.0));

        int lecturesCompleted = lessonProgressRepository.findByUserId(user.getId()).size();
        int testsCompleted = quizAttemptRepository.findByUserId(user.getId()).size();
        int umlCompleted = umlDiagramRepository.findByUserId(user.getId()).size();
        int caseStudiesCompleted = Math.max(0, lecturesCompleted / 2);

        List<Module> modules = moduleRepository.findAllByOrderByOrderIndexAsc();
        NextLessonDto nextLesson = null;
        if (!modules.isEmpty() && !modules.get(0).getLessons().isEmpty()) {
            Lesson firstLesson = modules.get(0).getLessons().get(0);
            nextLesson = new NextLessonDto(firstLesson.getId(), modules.get(0).getId(), modules.get(0).getTitle(), firstLesson.getTitle(), 0.0);
        }

        List<ActivityDto> recentActivities = activityRepository.findTop10ByUserIdOrderByTimestampDesc(user.getId()).stream()
                .map(a -> new ActivityDto(a.getId(), a.getTitle(), a.getActivityType(), a.getXpEarned(), a.getTimestamp()))
                .toList();

        return new DashboardSummaryDto(
                userDto, profileDto, univCard, batchCard, deptCard, globalCard,
                xpToNext, Math.round(progressPct * 10.0) / 10.0,
                lecturesCompleted, testsCompleted, umlCompleted, caseStudiesCompleted,
                nextLesson, recentActivities
        );
    }
}
