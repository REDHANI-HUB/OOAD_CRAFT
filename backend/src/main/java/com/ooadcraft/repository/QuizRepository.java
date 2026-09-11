package com.ooadcraft.repository;

import com.ooadcraft.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    @Query("SELECT q FROM Quiz q WHERE q.module.id = :moduleId")
    Optional<Quiz> findByModuleId(@Param("moduleId") Long moduleId);

    @Query("SELECT q FROM Quiz q WHERE q.module.id = :moduleId")
    List<Quiz> findAllByModuleId(@Param("moduleId") Long moduleId);
}
