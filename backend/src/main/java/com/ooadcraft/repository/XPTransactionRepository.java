package com.ooadcraft.repository;

import com.ooadcraft.model.XPTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface XPTransactionRepository extends JpaRepository<XPTransaction, Long> {
    @Query("SELECT xp FROM XPTransaction xp WHERE xp.user.id = :userId ORDER BY xp.createdAt DESC")
    List<XPTransaction> findByUserIdOrderByCreatedAtDesc(@Param("userId") Long userId);

    @Query("SELECT COUNT(xp) > 0 FROM XPTransaction xp WHERE xp.user.id = :userId AND xp.activityType = :activityType AND xp.referenceId = :referenceId")
    boolean existsByUserIdAndActivityTypeAndReferenceId(@Param("userId") Long userId, @Param("activityType") String activityType, @Param("referenceId") Long referenceId);
}
