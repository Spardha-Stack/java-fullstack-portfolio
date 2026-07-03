package com.spardha.portfolio.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String subtitle;

    @Column(length = 1000)
    private String description;

    @ElementCollection
    @CollectionTable(name = "project_features", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "feature")
    @Builder.Default
    private List<String> features = List.of();

    @ElementCollection
    @CollectionTable(name = "project_tech", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "tech")
    @Builder.Default
    private List<String> tech = List.of();

    private String period;

    private String githubUrl;

    private String liveUrl;

    @Column(name = "sort_order")
    private Integer sortOrder;
}
