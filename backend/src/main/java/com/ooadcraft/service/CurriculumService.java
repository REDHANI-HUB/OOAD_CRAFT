package com.ooadcraft.service;

import com.ooadcraft.model.*;
import com.ooadcraft.model.Module;
import com.ooadcraft.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CurriculumService {

    private final ModuleRepository moduleRepository;
    private final LessonRepository lessonRepository;
    private final LessonProgressRepository progressRepository;
    private final UserRepository userRepository;
    private final XPService xpService;

    public CurriculumService(ModuleRepository moduleRepository,
                             LessonRepository lessonRepository,
                             LessonProgressRepository progressRepository,
                             UserRepository userRepository,
                             XPService xpService) {
        this.moduleRepository = moduleRepository;
        this.lessonRepository = lessonRepository;
        this.progressRepository = progressRepository;
        this.userRepository = userRepository;
        this.xpService = xpService;
    }

    @Transactional(readOnly = true)
    public List<Module> getAllModules() {
        return moduleRepository.findAllByOrderByOrderIndexAsc();
    }

    @Transactional(readOnly = true)
    public Module getModuleById(Long id) {
        return moduleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Module not found with id: " + id));
    }

    @Transactional(readOnly = true)
    public Lesson getLessonById(Long id) {
        return lessonRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Lesson not found with id: " + id));
    }

    @Transactional
    public void completeLesson(Long lessonId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new IllegalArgumentException("Lesson not found"));

        if (progressRepository.findByUserIdAndLessonId(user.getId(), lessonId).isEmpty()) {
            progressRepository.save(new LessonProgress(user, lesson, "COMPLETED"));
            xpService.awardXP(user, "LESSON", lesson.getId(), lesson.getXpReward(), "Completed Lesson: " + lesson.getTitle());
        }
    }
}
