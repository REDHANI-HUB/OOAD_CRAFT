package com.ooadcraft.repository;

import com.ooadcraft.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> findByUserId(Long userId);
    List<Profile> findAllByOrderByTotalXPDesc();

    @Query("SELECT p FROM Profile p WHERE p.user.university = :university ORDER BY p.totalXP DESC")
    List<Profile> findByUniversityOrderByTotalXPDesc(@Param("university") String university);

    @Query("SELECT p FROM Profile p WHERE p.user.department = :department ORDER BY p.totalXP DESC")
    List<Profile> findByDepartmentOrderByTotalXPDesc(@Param("department") String department);

    @Query("SELECT p FROM Profile p WHERE p.user.batchYear = :batchYear ORDER BY p.totalXP DESC")
    List<Profile> findByBatchYearOrderByTotalXPDesc(@Param("batchYear") Integer batchYear);
}
