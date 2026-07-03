package com.spardha.portfolio.service.impl;

import com.spardha.portfolio.dto.ExperienceDTO;
import com.spardha.portfolio.mapper.ExperienceMapper;
import com.spardha.portfolio.repository.ExperienceRepository;
import com.spardha.portfolio.service.ExperienceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExperienceServiceImpl implements ExperienceService {

    private final ExperienceRepository experienceRepository;

    @Override
    public List<ExperienceDTO> getAll() {
        return experienceRepository.findAllByOrderBySortOrderAsc().stream()
                .map(ExperienceMapper::toDTO)
                .toList();
    }
}
