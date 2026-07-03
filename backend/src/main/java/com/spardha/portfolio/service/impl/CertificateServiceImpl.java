package com.spardha.portfolio.service.impl;

import com.spardha.portfolio.dto.CertificateDTO;
import com.spardha.portfolio.mapper.CertificateMapper;
import com.spardha.portfolio.repository.CertificateRepository;
import com.spardha.portfolio.service.CertificateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CertificateServiceImpl implements CertificateService {

    private final CertificateRepository certificateRepository;

    @Override
    public List<CertificateDTO> getAll() {
        return certificateRepository.findAllByOrderBySortOrderAsc().stream()
                .map(CertificateMapper::toDTO)
                .toList();
    }
}
