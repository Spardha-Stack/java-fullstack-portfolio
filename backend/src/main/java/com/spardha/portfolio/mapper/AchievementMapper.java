package com.spardha.portfolio.mapper;

import com.spardha.portfolio.dto.AchievementDTO;
import com.spardha.portfolio.entity.Achievement;

public class AchievementMapper {

    private AchievementMapper() {}

    public static AchievementDTO toDTO(Achievement entity) {
        if (entity == null) return null;
        return AchievementDTO.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .category(entity.getCategory())
                .description(entity.getDescription())
                .value(entity.getValue())
                .build();
    }
}
