package net.javaguides.ems.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaEmailNotificationService {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendEmailRequest(String to, String subject, String text) {
        String message = String.format("%s;%s;%s", to, subject, text);
        kafkaTemplate.send("email-topic", message);
    }
}

