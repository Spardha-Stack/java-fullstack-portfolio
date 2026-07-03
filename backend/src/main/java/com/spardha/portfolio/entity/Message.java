package com.spardha.portfolio.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    private String subject;

    @Column(length = 2000, nullable = false)
    private String message;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Builder.Default
    private Boolean read = false;

    @PrePersist
    void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
