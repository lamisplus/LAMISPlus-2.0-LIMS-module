package org.lamisplus.modules.lims.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class LIMSTest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;
    @Column(name = "uuid")
    private String uuid;
    @Column(name = "patient_id")
    private int patientId;
    @Column(name = "lab_test_id")
    private int labTestId;
    @Column(name = "description")
    private String description;
    @Column(name = "lab_number")
    private String labNumber;
    @Column(name = "lab_test_group_id")
    private int labTestGroupId;
    @Column(name = "order_priority")
    private int orderPriority;
    @Column(name = "unit_measurement")
    private String unitMeasurement;
    @Column(name = "lab_test_order_status")
    private int labTestOrderStatus;
    @Column(name = "viral_load_indication")
    private int viralLoadIndication;
    @Column(name = "lab_order_id")
    private int labOrderId;
    @Column(name = "patient_uuid")
    private String patientUuid;
    @Column(name = "facility_id")
    private Long facilityId;
}
