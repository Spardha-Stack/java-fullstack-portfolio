package com.spardha.portfolio.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileDTO {
    private String name;
    private String title;
    private List<String> roles;
    private String email;
    private String phone;
    private String location;
    private String summary;
    private String githubUrl;
    private String linkedinUrl;
    private String leetcodeUrl;
}
