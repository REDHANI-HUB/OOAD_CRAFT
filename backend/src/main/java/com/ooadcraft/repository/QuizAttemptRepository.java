package com.ooadcraft.repository;

import com.ooadcraft.model.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {
    @Query("SELECT qa FROM QuizAttempt qa WHERE qa.user.id = :userId")
    List<QuizAttempt> findByUserId(@Param("userId") Long userId);

    @Query("SELECT qa FROM QuizAttempt qa WHERE qa.user.id = :userId AND qa.quiz.id = :quizId")
    List<QuizAttempt> findByUserIdAndQuizId(@Param("userId") Long userId, @Param("quizId") Long quizId);
}
