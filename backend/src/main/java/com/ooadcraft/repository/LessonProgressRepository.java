package com.ooadcraft.repository;

import com.ooadcraft.model.LessonProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface LessonProgressRepository extends JpaRepository<LessonProgress, Long> {
    @Query("SELECT lp FROM LessonProgress lp WHERE lp.user.id = :userId AND lp.lesson.id = :lessonId")
    Optional<LessonProgress> findByUserIdAndLessonId(@Param("userId") Long userId, @Param("lessonId") Long lessonId);

    @Query("SELECT lp FROM LessonProgress lp WHERE lp.user.id = :userId")
    List<LessonProgress> findByUserId(@Param("userId") Long userId);
}
