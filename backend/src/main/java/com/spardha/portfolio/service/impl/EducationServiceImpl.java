package com.spardha.portfolio.service.impl;

import com.spardha.portfolio.dto.EducationDTO;
import com.spardha.portfolio.mapper.EducationMapper;
import com.spardha.portfolio.repository.EducationRepository;
import com.spardha.portfolio.service.EducationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EducationServiceImpl implements EducationService {

    private final EducationRepository educationRepository;

    @Override
    public List<EducationDTO> getAll() {
        return educationRepository.findAllByOrderBySortOrderAsc().stream()
                .map(EducationMapper::toDTO)
                .toList();
    }
}
