package com.ooadcraft.repository;

import com.ooadcraft.model.UMLDiagram;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UMLDiagramRepository extends JpaRepository<UMLDiagram, Long> {
    List<UMLDiagram> findByUserId(Long userId);
}
