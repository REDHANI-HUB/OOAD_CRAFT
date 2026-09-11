package com.ooadcraft.repository;

import com.ooadcraft.model.CaseStudy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CaseStudyRepository extends JpaRepository<CaseStudy, Long> {
}
