package com.spardha.portfolio.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "achievements")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Achievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    // e.g. "Academic", "Professional Development", "Project Impact", "Certifications"
    @Column(nullable = false)
    private String category;

    @Column(length = 500)
    private String description;

    // Short highlight value shown on the card, e.g. "8.40", "30%", "10+"
    private String value;

    @Column(name = "sort_order")
    private Integer sortOrder;
}
