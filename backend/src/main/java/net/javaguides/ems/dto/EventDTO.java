package net.javaguides.ems.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventDTO {
    private Long event_id;
    private String title;
    private LocalDate date;
    private String place;
    private EventCategoryDTO category;
    private String description;
    private String photo;


}
