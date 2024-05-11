package net.javaguides.ems.dto;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventCategoryDTO {
    private Long categoryId;
    private String categoryName;
}
