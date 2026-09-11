package com.ooadcraft.repository;

import com.ooadcraft.model.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ModuleRepository extends JpaRepository<Module, Long> {
    List<Module> findAllByOrderByOrderIndexAsc();
}
