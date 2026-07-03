package com.spardha.portfolio.service.impl;

import com.spardha.portfolio.dto.ContactRequestDTO;
import com.spardha.portfolio.dto.ContactResponseDTO;
import com.spardha.portfolio.entity.Message;
import com.spardha.portfolio.mapper.MessageMapper;
import com.spardha.portfolio.repository.MessageRepository;
import com.spardha.portfolio.service.ContactService;
import com.spardha.portfolio.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final MessageRepository messageRepository;
    private final EmailService emailService;

    @Override
    public ContactResponseDTO submit(ContactRequestDTO request) {
        Message saved = messageRepository.save(MessageMapper.toEntity(request));
        emailService.sendContactNotification(saved);
        return MessageMapper.toResponse(saved);
    }
}
