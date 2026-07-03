package com.spardha.portfolio.controller;

import com.spardha.portfolio.dto.ExperienceDTO;
import com.spardha.portfolio.service.ExperienceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/experience")
@RequiredArgsConstructor
@Tag(name = "Experience", description = "Work experience timeline")
public class ExperienceController {

    private final ExperienceService experienceService;

    @GetMapping
    @Operation(summary = "List all experience entries")
    public ResponseEntity<List<ExperienceDTO>> getAll() {
        return ResponseEntity.ok(experienceService.getAll());
    }
}
