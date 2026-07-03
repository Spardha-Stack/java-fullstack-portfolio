package com.spardha.portfolio.controller;

import com.spardha.portfolio.dto.ContactRequestDTO;
import com.spardha.portfolio.dto.ContactResponseDTO;
import com.spardha.portfolio.service.ContactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@Tag(name = "Contact", description = "Contact form submissions")
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    @Operation(summary = "Submit the contact form")
    public ResponseEntity<ContactResponseDTO> submit(@Valid @RequestBody ContactRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(contactService.submit(request));
    }
}
