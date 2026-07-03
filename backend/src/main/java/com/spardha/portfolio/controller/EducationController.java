package com.spardha.portfolio.controller;

import com.spardha.portfolio.dto.EducationDTO;
import com.spardha.portfolio.service.EducationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/education")
@RequiredArgsConstructor
@Tag(name = "Education", description = "Academic history")
public class EducationController {

    private final EducationService educationService;

    @GetMapping
    @Operation(summary = "List all education entries")
    public ResponseEntity<List<EducationDTO>> getAll() {
        return ResponseEntity.ok(educationService.getAll());
    }
}
