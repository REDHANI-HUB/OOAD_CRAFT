package com.ooadcraft.repository;

import com.ooadcraft.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    Optional<Quiz> findByModuleId(Long moduleId);
    List<Quiz> findAllByModuleId(Long moduleId);
}
