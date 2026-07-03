package com.spardha.portfolio.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI portfolioOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Spardha Shukla — Portfolio API")
                        .description("REST API backing the portfolio frontend: projects, skills, experience, education, certificates, and contact form.")
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("Spardha Shukla")
                                .email("spardha964864shukla@gmail.com")));
    }
}
