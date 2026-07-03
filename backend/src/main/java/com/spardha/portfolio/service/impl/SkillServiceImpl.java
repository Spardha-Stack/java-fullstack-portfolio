package com.spardha.portfolio.service.impl;

import com.spardha.portfolio.dto.SkillDTO;
import com.spardha.portfolio.mapper.SkillMapper;
import com.spardha.portfolio.repository.SkillRepository;
import com.spardha.portfolio.service.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;

    @Override
    public List<SkillDTO> getAll() {
        return skillRepository.findAllByOrderBySortOrderAsc().stream()
                .map(SkillMapper::toDTO)
                .toList();
    }
}
