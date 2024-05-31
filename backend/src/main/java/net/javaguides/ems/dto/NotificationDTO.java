package net.javaguides.ems.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDTO {
    private Long userId;
    private Long eventId;
    private String type;
    private LocalDateTime reminderTime;
}
