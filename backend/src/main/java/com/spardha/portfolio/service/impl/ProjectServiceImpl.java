package com.spardha.portfolio.service.impl;

import com.spardha.portfolio.dto.ProjectDTO;
import com.spardha.portfolio.exception.ResourceNotFoundException;
import com.spardha.portfolio.mapper.ProjectMapper;
import com.spardha.portfolio.repository.ProjectRepository;
import com.spardha.portfolio.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    @Override
    public List<ProjectDTO> getAll() {
        return projectRepository.findAllByOrderBySortOrderAsc().stream()
                .map(ProjectMapper::toDTO)
                .toList();
    }

    @Override
    public ProjectDTO getById(Long id) {
        return projectRepository.findById(id)
                .map(ProjectMapper::toDTO)
                .orElseThrow(() -> ResourceNotFoundException.forId("Project", id));
    }
}
