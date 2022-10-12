package org.lamisplus.modules.lims.repository;

import org.lamisplus.modules.lims.domain.entity.LIMSResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

public interface LimsResultRepository extends JpaRepository<LIMSResult, Integer> {
    List<LIMSResult> findAllByManifestRecordID(Integer id);

    @Transactional
    @Modifying
    @Query(value="insert into laboratory_result(uuid, date_assayed, date_result_reported, result_reported, test_id, patient_uuid, facility_id, patient_id)\n" +
            "values(:uuid, :date_assayed, :date_result_reported, :result_reported, :test_id, :patient_uuid, :facility_id, :patient_id)", nativeQuery = true)
    void SaveSampleResult(@Param("uuid") String uuid,
                          @Param("date_assayed") LocalDateTime dateAssayed,
                          @Param("date_result_reported") LocalDateTime dateResultReported,
                          @Param("result_reported") String resultReported,
                          @Param("test_id") int testId,
                          @Param("patient_uuid") String patientUuid,
                          @Param("facility_id") String facilityId,
                          @Param("patient_id") int patientId);
}
