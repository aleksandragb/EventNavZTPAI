package net.javaguides.ems.controller;

import net.javaguides.ems.dto.NotificationDTO;
import net.javaguides.ems.entity.User;
import net.javaguides.ems.repository.UserRepository;
import net.javaguides.ems.service.NotificationService;
import net.javaguides.ems.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

//    @PostMapping
//    public ResponseEntity<NotificationDTO> createNotification(@RequestBody NotificationDTO notificationDTO) {
//        NotificationDTO createdNotification = notificationService.createNotification(notificationDTO);
//        return ResponseEntity.ok(createdNotification);
//    }

    @PostMapping
    public ResponseEntity<NotificationDTO> createNotification(@RequestBody NotificationDTO notificationDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName(); // Pobieranie emaila z danych autentykacji
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Dodanie userId do DTO
        notificationDTO.setUserId(user.getUser_id());

        NotificationDTO createdNotification = notificationService.createNotification(notificationDTO);
        return ResponseEntity.ok(createdNotification);
    }

    @GetMapping
    public ResponseEntity<String> sendTestMail() {
        String to = "olaxgb@gmail.com";  // Przykładowy adres odbiorcy
        String subject = "Test Email";
        String text = "This is a test email sent from Spring Boot application.";

        emailService.sendSimpleEmail(to, subject, text);

        return ResponseEntity.ok("Email has been sent successfully to " + to);
    }
}

