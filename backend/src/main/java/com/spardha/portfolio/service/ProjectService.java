package com.spardha.portfolio.service;

import com.spardha.portfolio.dto.ProjectDTO;

import java.util.List;

public interface ProjectService {
    List<ProjectDTO> getAll();

    ProjectDTO getById(Long id);
}
