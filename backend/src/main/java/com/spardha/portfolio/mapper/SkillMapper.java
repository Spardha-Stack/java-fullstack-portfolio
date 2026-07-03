package com.spardha.portfolio.mapper;

import com.spardha.portfolio.dto.SkillDTO;
import com.spardha.portfolio.entity.Skill;

public class SkillMapper {

    private SkillMapper() {}

    public static SkillDTO toDTO(Skill entity) {
        if (entity == null) return null;
        return SkillDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .level(entity.getLevel())
                .category(entity.getCategory())
                .build();
    }
}
