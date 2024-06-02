package net.javaguides.ems.controller;

import lombok.RequiredArgsConstructor;
import net.javaguides.ems.dto.EventDTO;
import net.javaguides.ems.entity.Event;
import net.javaguides.ems.service.EventsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventsController {
    private final EventsService eventsService;

    // Endpoint do pobierania polubionych wydarzeń
    @GetMapping("/interested")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<List<EventDTO>> getInterestedEvents() {
        List<EventDTO> interestedEvents = eventsService.getInterestedEvents();
        return ResponseEntity.ok(interestedEvents);
    }

    @GetMapping()
    public ResponseEntity<List<EventDTO>> getEvents() {
        List<EventDTO> Events = eventsService.getEvents();
        return ResponseEntity.ok(Events);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDTO> getEvent(@PathVariable Long id) {
        EventDTO event = eventsService.getEvent(id);
        return ResponseEntity.ok(event);
    }
}