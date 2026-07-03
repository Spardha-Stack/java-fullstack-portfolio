package com.spardha.portfolio.controller;

import com.spardha.portfolio.dto.ProjectDTO;
import com.spardha.portfolio.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@Tag(name = "Projects", description = "Portfolio project listings")
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping
    @Operation(summary = "List all projects")
    public ResponseEntity<List<ProjectDTO>> getAll() {
        return ResponseEntity.ok(projectService.getAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a single project by id")
    public ResponseEntity<ProjectDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getById(id));
    }
}
