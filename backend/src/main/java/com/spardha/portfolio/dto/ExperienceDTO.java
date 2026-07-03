package com.spardha.portfolio.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExperienceDTO {
    private Long id;
    private String role;
    private String org;
    private String period;
    private String location;
    private String description;
}
