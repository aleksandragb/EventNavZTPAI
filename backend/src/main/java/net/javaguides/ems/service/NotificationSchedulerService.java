package net.javaguides.ems.service;
import net.javaguides.ems.entity.Notification;
import net.javaguides.ems.repository.NotificationRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class NotificationSchedulerService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private KafkaEmailNotificationService kafkaEmailNotificationService;

    @Scheduled(fixedRate = 60000)
    public void sendScheduledNotifications() {
        LocalDateTime now = LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES);
        System.out.println("Siema, działam co minutę");

        List<Notification> notifications = notificationRepository.findNotificationsByReminderTime(now);

        for (Notification notification : notifications) {
            kafkaEmailNotificationService.sendEmailRequest(
                    notification.getUser().getEmail(),
                    notification.getEvent().getTitle() + " is starting soon!",
                    "Hey, don't forget your event starts soon!"
            );
            notificationRepository.delete(notification);
        }
    }
}
