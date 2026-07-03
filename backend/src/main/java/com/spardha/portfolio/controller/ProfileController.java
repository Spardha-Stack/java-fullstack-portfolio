package com.spardha.portfolio.controller;

import com.spardha.portfolio.dto.ProfileDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/profile")
@Tag(name = "Profile", description = "Top-level profile info shown in the hero/contact sections")
public class ProfileController {

    @Value("${app.profile.name:Spardha Shukla}")
    private String name;

    @Value("${app.profile.title:Software Developer Engineer}")
    private String title;

    @Value("${app.profile.email:spardha964864shukla@gmail.com}")
    private String email;

    @Value("${app.profile.phone:+91 82998 27036}")
    private String phone;

    @Value("${app.profile.location:Kanpur, Uttar Pradesh, India}")
    private String location;

    @Value("${app.profile.summary:Ambitious and results-driven Software Engineer skilled in Java, Python, and the MERN stack.}")
    private String summary;

    @Value("${app.profile.github:}")
    private String githubUrl;

    @Value("${app.profile.linkedin:}")
    private String linkedinUrl;

    @Value("${app.profile.leetcode:}")
    private String leetcodeUrl;

    @GetMapping
    @Operation(summary = "Get top-level profile info")
    public ResponseEntity<ProfileDTO> getProfile() {
        ProfileDTO dto = ProfileDTO.builder()
                .name(name)
                .title(title)
                .roles(List.of("Java Full Stack Developer", "AI Engineer", "Problem Solver", "Open Source Learner"))
                .email(email)
                .phone(phone)
                .location(location)
                .summary(summary)
                .githubUrl(githubUrl)
                .linkedinUrl(linkedinUrl)
                .leetcodeUrl(leetcodeUrl)
                .build();
        return ResponseEntity.ok(dto);
    }
}
