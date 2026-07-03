package com.spardha.portfolio.mapper;

import com.spardha.portfolio.dto.ProjectDTO;
import com.spardha.portfolio.entity.Project;

public class ProjectMapper {

    private ProjectMapper() {}

    public static ProjectDTO toDTO(Project entity) {
        if (entity == null) return null;
        return ProjectDTO.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .subtitle(entity.getSubtitle())
                .description(entity.getDescription())
                .features(entity.getFeatures())
                .tech(entity.getTech())
                .period(entity.getPeriod())
                .githubUrl(entity.getGithubUrl())
                .liveUrl(entity.getLiveUrl())
                .build();
    }
}
