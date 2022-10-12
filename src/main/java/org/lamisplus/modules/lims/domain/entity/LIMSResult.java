package org.lamisplus.modules.lims.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "lims_result")
public class LIMSResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;
    @Column(name = "uuid", nullable = false, unique = true, updatable = false)
    private String uuid;
    @Column(name = "sample_id")
    private String sampleID;
    @Column(name = "pcr_lab_sample_number")
    private String pcrLabSampleNumber;
    @Column(name = "visit_date")
    private String visitDate;
    @Column(name = "date_sample_received_at_pcr_lab")
    private String dateSampleReceivedAtPcrLab;
    @Column(name = "result_date")
    private String resultDate;
    @Column(name = "test_result")
    private String testResult;
    @Column(name = "assay_date")
    private String assayDate;
    @Column(name = "approval_date")
    private String approvalDate;
    @Column(name = "date_result_dispatched")
    private String dateResultDispatched;
    @Column(name = "sample_status")
    private String sampleStatus;
    @Column(name = "sample_testable")
    private String sampleTestable;
    @Column(name = "manifest_record_id")
    private int manifestRecordID;
}
