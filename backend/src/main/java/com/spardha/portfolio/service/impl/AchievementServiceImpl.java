package com.spardha.portfolio.service.impl;

import com.spardha.portfolio.dto.AchievementDTO;
import com.spardha.portfolio.mapper.AchievementMapper;
import com.spardha.portfolio.repository.AchievementRepository;
import com.spardha.portfolio.service.AchievementService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AchievementServiceImpl implements AchievementService {

    private final AchievementRepository achievementRepository;

    @Override
    public List<AchievementDTO> getAll() {
        return achievementRepository.findAllByOrderBySortOrderAsc().stream()
                .map(AchievementMapper::toDTO)
                .toList();
    }
}
