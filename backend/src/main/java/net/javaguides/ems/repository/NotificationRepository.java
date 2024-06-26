package net.javaguides.ems.repository;
import net.javaguides.ems.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findNotificationsByReminderTime(LocalDateTime reminderTime);
}
