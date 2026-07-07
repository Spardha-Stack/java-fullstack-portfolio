package com.spardha.portfolio.mapper;

import com.spardha.portfolio.dto.CertificateDTO;
import com.spardha.portfolio.entity.Certificate;

public class CertificateMapper {

    private CertificateMapper() {
    }

    public static CertificateDTO toDTO(Certificate entity) {
        if (entity == null)
            return null;
        return CertificateDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .org(entity.getOrg())
                .date(entity.getDate())
                .image(entity.getImage())
                .link(entity.getLink())
                .build();
    }
}
