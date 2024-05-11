package net.javaguides.ems.service;

import lombok.RequiredArgsConstructor;
import net.javaguides.ems.dto.EventDTO;
import net.javaguides.ems.dto.EventCategoryDTO;
import net.javaguides.ems.entity.Event;
import net.javaguides.ems.entity.EventCategory;
import net.javaguides.ems.entity.Interests;
import net.javaguides.ems.repository.EventRepository;
import net.javaguides.ems.repository.InterestsRepository;
import net.javaguides.ems.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventsService {

    private final InterestsRepository interestsRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public List<EventDTO> getInterestedEvents() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return interestsRepository.findAllByUserEmail(userEmail).stream()
                .map(interest -> mapToDTO(interest.getEvent()))
                .collect(Collectors.toList());
    }
    public List<EventDTO> getEvents() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return interestsRepository.findAllByUserEmail(userEmail).stream()
                .map(interest -> mapToDTO(interest.getEvent()))
                .collect(Collectors.toList());
    }
    public EventDTO getEvent(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        return mapToDTO(event);
    }


    private EventDTO mapToDTO(Event event) {
        return new EventDTO(
                event.getEvent_id(),
                event.getTitle(),
                event.getDate(),
                event.getPlace(),
                mapToCategoryDTO(event.getCategory()),
                event.getDescription(),
                event.getPhoto()
        );
    }

    private EventCategoryDTO mapToCategoryDTO(EventCategory category) {
        if (category == null) {
            return null;
        }
        return new EventCategoryDTO(category.getCategoryId(), category.getCategoryName());
    }
}
