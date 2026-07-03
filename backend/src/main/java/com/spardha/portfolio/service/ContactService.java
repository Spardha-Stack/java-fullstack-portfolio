package com.spardha.portfolio.service;

import com.spardha.portfolio.dto.ContactRequestDTO;
import com.spardha.portfolio.dto.ContactResponseDTO;

public interface ContactService {
    ContactResponseDTO submit(ContactRequestDTO request);
}
