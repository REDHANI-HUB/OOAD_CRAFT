package com.ooadcraft.repository;

import com.ooadcraft.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    @Query("SELECT a FROM Activity a WHERE a.user.id = :userId ORDER BY a.timestamp DESC")
    List<Activity> findTop10ByUserIdOrderByTimestampDesc(@Param("userId") Long userId);
}
