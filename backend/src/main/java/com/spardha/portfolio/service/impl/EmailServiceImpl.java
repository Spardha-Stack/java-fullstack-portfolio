package com.spardha.portfolio.service.impl;

import com.spardha.portfolio.entity.Message;
import com.spardha.portfolio.service.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String fromAddress;

    // Notifications land in the same inbox that sends them, i.e. the portfolio owner's address.
    @Value("${app.notify.email:}")
    private String notifyAddress;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendContactNotification(Message message) {
        if (fromAddress == null || fromAddress.isBlank()) {
            log.info("Mail not configured (MAIL_USERNAME unset) — skipping email notification for message id={}", message.getId());
            return;
        }
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setFrom(fromAddress);
            mail.setTo(notifyAddress.isBlank() ? fromAddress : notifyAddress);
            mail.setSubject("Portfolio contact: " + (message.getSubject() == null ? "New message" : message.getSubject()));
            mail.setText(
                "From: " + message.getName() + " <" + message.getEmail() + ">\n\n" + message.getMessage()
            );
            mailSender.send(mail);
        } catch (Exception ex) {
            // Never let an email failure surface as a 500 to the person who just filled out the form.
            log.warn("Failed to send contact notification email: {}", ex.getMessage());
        }
    }
}
