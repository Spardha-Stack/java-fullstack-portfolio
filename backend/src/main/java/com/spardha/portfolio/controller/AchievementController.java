package com.spardha.portfolio.controller;

import com.spardha.portfolio.dto.AchievementDTO;
import com.spardha.portfolio.service.AchievementService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/achievements")
@RequiredArgsConstructor
@Tag(name = "Achievements", description = "Academic, professional, and project achievements")
public class AchievementController {

    private final AchievementService achievementService;

    @GetMapping
    @Operation(summary = "List all achievements")
    public ResponseEntity<List<AchievementDTO>> getAll() {
        return ResponseEntity.ok(achievementService.getAll());
    }
}
