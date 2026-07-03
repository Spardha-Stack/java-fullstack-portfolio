package com.spardha.portfolio.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectDTO {
    private Long id;
    private String title;
    private String subtitle;
    private String description;
    private List<String> features;
    private List<String> tech;
    private String period;
    private String githubUrl;
    private String liveUrl;
}
