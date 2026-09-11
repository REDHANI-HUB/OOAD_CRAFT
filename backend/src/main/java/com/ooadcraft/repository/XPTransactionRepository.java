package com.ooadcraft.repository;

import com.ooadcraft.model.XPTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface XPTransactionRepository extends JpaRepository<XPTransaction, Long> {
    List<XPTransaction> findByUserIdOrderByCreatedAtDesc(Long userId);
    boolean existsByUserIdAndActivityTypeAndReferenceId(Long userId, String activityType, Long referenceId);
}
