package com.ooadcraft.repository;

import com.ooadcraft.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findTop10ByUserIdOrderByTimestampDesc(Long userId);
}
