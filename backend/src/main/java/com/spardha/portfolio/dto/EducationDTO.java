package com.spardha.portfolio.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EducationDTO {
    private Long id;
    private String degree;
    private String institution;
    private String period;
    private String location;
    private String score;
}
