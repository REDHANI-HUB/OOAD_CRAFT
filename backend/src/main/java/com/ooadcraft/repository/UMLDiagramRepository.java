package com.ooadcraft.repository;

import com.ooadcraft.model.UMLDiagram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface UMLDiagramRepository extends JpaRepository<UMLDiagram, Long> {
    @Query("SELECT u FROM UMLDiagram u WHERE u.user.id = :userId")
    List<UMLDiagram> findByUserId(@Param("userId") Long userId);
}
