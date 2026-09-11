package com.ooadcraft.repository;

import com.ooadcraft.model.DesignPattern;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DesignPatternRepository extends JpaRepository<DesignPattern, Long> {
    List<DesignPattern> findByCategory(String category);
}
