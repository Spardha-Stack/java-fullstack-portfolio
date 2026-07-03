package com.spardha.portfolio.controller;

import com.spardha.portfolio.dto.SkillDTO;
import com.spardha.portfolio.service.SkillService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
@Tag(name = "Skills", description = "Skill proficiency data")
public class SkillController {

    private final SkillService skillService;

    @GetMapping
    @Operation(summary = "List all skills")
    public ResponseEntity<List<SkillDTO>> getAll() {
        return ResponseEntity.ok(skillService.getAll());
    }
}
