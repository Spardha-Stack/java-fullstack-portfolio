package com.spardha.portfolio.controller;

import com.spardha.portfolio.dto.CertificateDTO;
import com.spardha.portfolio.service.CertificateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/certificates")
@RequiredArgsConstructor
@Tag(name = "Certificates", description = "Certifications earned")
public class CertificateController {

    private final CertificateService certificateService;

    @GetMapping
    @Operation(summary = "List all certificates")
    public ResponseEntity<List<CertificateDTO>> getAll() {
        return ResponseEntity.ok(certificateService.getAll());
    }
}
