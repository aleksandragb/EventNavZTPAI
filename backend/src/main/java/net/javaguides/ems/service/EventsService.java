package net.javaguides.ems.service;

import lombok.RequiredArgsConstructor;
import net.javaguides.ems.dto.EventDTO;
import net.javaguides.ems.dto.EventCategoryDTO;
import net.javaguides.ems.entity.Event;
import net.javaguides.ems.entity.EventCategory;
import net.javaguides.ems.repository.EventCategoryRepository;
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
    private final EventCategoryRepository eventCategoryRepository;

    public Event createEvent(EventDTO eventDTO) {
        System.out.println("Category ID received: " + eventDTO.getCategory().getCategoryId());

        EventCategory category = eventCategoryRepository.findById(eventDTO.getCategory().getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + eventDTO.getCategory().getCategoryId()));

        Event event = new Event();
        event.setTitle(eventDTO.getTitle())
                .setDate(eventDTO.getDate())
                .setPlace(eventDTO.getPlace())
                .setCategory(category)
                .setDescription(eventDTO.getDescription())
                .setPhoto(eventDTO.getPhoto());

        return eventRepository.save(event);
    }

    public List<EventDTO> getInterestedEvents() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return interestsRepository.findAllByUserEmail(userEmail).stream()
                .map(interest -> mapToDTO(interest.getEvent()))
                .collect(Collectors.toList());
    }
    public List<EventDTO> getEvents() {
        return eventRepository.findAll().stream()
                .map(this::mapToDTO)
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

    private EventCategory convertCategoryDTOToEntity(EventCategoryDTO categoryDTO) {
        if (categoryDTO == null) {
            return null;
        }
        return eventCategoryRepository.findById(categoryDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryDTO.getCategoryId()));
    }

    private EventCategoryDTO mapCategoryToDTO(EventCategory category) {
        if (category == null) {
            return null;
        }
        return new EventCategoryDTO(category.getCategoryId(), category.getCategoryName());
    }
}
