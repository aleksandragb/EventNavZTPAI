package net.javaguides.ems.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Accessors(chain = true)
@Table(name = "reported")
public class ReportedEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reported_id;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    private String title;
    private LocalDate date;
    private String place;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private EventCategory category;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 1024)
    private String photo;


}
