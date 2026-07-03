package com.spardha.portfolio.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Basic security configuration.
 *
 * The portfolio's read endpoints (projects, skills, experience, education,
 * certificates, profile) and the contact-form POST are public by design —
 * this is a public-facing site, not an authenticated app.
 *
 * The filter chain is structured so that an admin-only section
 * (e.g. PUT/DELETE on /api/admin/**, backed by the existing User entity
 * and UserRepository) can be added later by inserting an
 * .authenticated() rule and a JWT/session filter, without restructuring
 * this class.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/projects/**", "/api/skills/**", "/api/experience/**",
                        "/api/education/**", "/api/certificates/**", "/api/achievements/**",
                        "/api/profile/**", "/api/contact")
                .permitAll()
                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                // Reserved for a future admin panel (see class-level note).
                .requestMatchers("/api/admin/**").authenticated()
                .anyRequest().permitAll()
            )
            .httpBasic(basic -> {}); // placeholder auth mechanism for the reserved admin routes

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
