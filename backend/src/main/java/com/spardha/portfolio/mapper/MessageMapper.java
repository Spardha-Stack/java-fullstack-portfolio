package com.spardha.portfolio.mapper;

import com.spardha.portfolio.dto.ContactRequestDTO;
import com.spardha.portfolio.dto.ContactResponseDTO;
import com.spardha.portfolio.entity.Message;

public class MessageMapper {

    private MessageMapper() {}

    public static Message toEntity(ContactRequestDTO dto) {
        if (dto == null) return null;
        return Message.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .subject(dto.getSubject())
                .message(dto.getMessage())
                .build();
    }

    public static ContactResponseDTO toResponse(Message entity) {
        if (entity == null) return null;
        return ContactResponseDTO.builder()
                .id(entity.getId())
                .status("RECEIVED")
                .message("Thanks for reaching out — I'll get back to you soon.")
                .submittedAt(entity.getCreatedAt())
                .build();
    }
}
