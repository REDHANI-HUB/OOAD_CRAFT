package com.ooadcraft.repository;

import com.ooadcraft.model.UserAchievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface UserAchievementRepository extends JpaRepository<UserAchievement, Long> {
    @Query("SELECT ua FROM UserAchievement ua WHERE ua.user.id = :userId")
    List<UserAchievement> findByUserId(@Param("userId") Long userId);

    @Query("SELECT ua FROM UserAchievement ua WHERE ua.user.id = :userId AND ua.achievement.id = :achievementId")
    Optional<UserAchievement> findByUserIdAndAchievementId(@Param("userId") Long userId, @Param("achievementId") Long achievementId);
}
