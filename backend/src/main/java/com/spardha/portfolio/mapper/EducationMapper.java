package com.spardha.portfolio.mapper;

import com.spardha.portfolio.dto.EducationDTO;
import com.spardha.portfolio.entity.Education;

public class EducationMapper {

    private EducationMapper() {}

    public static EducationDTO toDTO(Education entity) {
        if (entity == null) return null;
        return EducationDTO.builder()
                .id(entity.getId())
                .degree(entity.getDegree())
                .institution(entity.getInstitution())
                .period(entity.getPeriod())
                .location(entity.getLocation())
                .score(entity.getScore())
                .build();
    }
}
