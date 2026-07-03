package com.spardha.portfolio.mapper;

import com.spardha.portfolio.dto.ExperienceDTO;
import com.spardha.portfolio.entity.Experience;

public class ExperienceMapper {

    private ExperienceMapper() {}

    public static ExperienceDTO toDTO(Experience entity) {
        if (entity == null) return null;
        return ExperienceDTO.builder()
                .id(entity.getId())
                .role(entity.getRole())
                .org(entity.getOrg())
                .period(entity.getPeriod())
                .location(entity.getLocation())
                .description(entity.getDescription())
                .build();
    }
}
