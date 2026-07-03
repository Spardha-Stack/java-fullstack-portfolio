package com.spardha.portfolio.service;

import com.spardha.portfolio.entity.Message;

public interface EmailService {
    void sendContactNotification(Message message);
}
