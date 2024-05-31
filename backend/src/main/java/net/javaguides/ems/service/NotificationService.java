package net.javaguides.ems.service;
import net.javaguides.ems.dto.NotificationDTO;
import net.javaguides.ems.entity.Notification;
import net.javaguides.ems.entity.User;
import net.javaguides.ems.entity.Event;
import net.javaguides.ems.repository.NotificationRepository;
import net.javaguides.ems.repository.UserRepository;
import net.javaguides.ems.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    public NotificationDTO createNotification(NotificationDTO notificationDTO) {
        User user = userRepository.findById(notificationDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Event event = eventRepository.findById(notificationDTO.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        Notification notification = new Notification();
        notification.setUser(user);
        notification.setEvent(event);
        notification.setType(notificationDTO.getType());
        notification.setReminderTime(notificationDTO.getReminderTime());

        Notification savedNotification = notificationRepository.save(notification);

        return new NotificationDTO(
                savedNotification.getUser().getUser_id(),
                savedNotification.getEvent().getEvent_id(),
                savedNotification.getType(),
                savedNotification.getReminderTime());
    }

}

