package net.javaguides.ems.service;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KafkaEmailConsumerService {

    @Autowired
    private EmailService emailService;

    @KafkaListener(topics = "email-topic", groupId = "email-group")
    public void listenForEmailRequests(String message) {
        String[] parts = message.split(";");
        System.out.println(parts[0] + parts[1] + parts[2]);
        if (parts.length == 3) {
            System.out.println(parts[0] + parts[1] + parts[2]);
            emailService.sendSimpleEmail(parts[0], parts[1], parts[2]);
        }
    }
}