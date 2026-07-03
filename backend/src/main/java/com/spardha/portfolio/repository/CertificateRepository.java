package com.spardha.portfolio.repository;

import com.spardha.portfolio.entity.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CertificateRepository extends JpaRepository<Certificate, Long> {
    List<Certificate> findAllByOrderBySortOrderAsc();
}
