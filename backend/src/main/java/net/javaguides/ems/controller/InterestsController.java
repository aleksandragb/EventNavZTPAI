package net.javaguides.ems.controller;

import lombok.RequiredArgsConstructor;
import net.javaguides.ems.entity.Event;
import net.javaguides.ems.entity.User;
import net.javaguides.ems.service.InterestsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import net.javaguides.ems.repository.UserRepository;
import net.javaguides.ems.repository.EventRepository;
import net.javaguides.ems.repository.InterestsRepository;

@RestController
@RequestMapping("/api/interests")
@RequiredArgsConstructor
public class InterestsController {


    private final InterestsService interestsService;
    @Autowired
    private InterestsRepository interestsRepository;
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add/{eventId}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<String> addInterest(@PathVariable Long eventId) {
        interestsService.addInterest(eventId);
        return ResponseEntity.ok("Event added to favorites.");
    }

    @PostMapping("/remove/{eventId}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<String> removeInterest(@PathVariable Long eventId) {
        interestsService.removeInterest(eventId);
        return ResponseEntity.ok("Event removed from favorites.");
    }

    @GetMapping("/isInterested/{eventId}")
    public ResponseEntity<Boolean> isInterested(@PathVariable Long eventId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal() instanceof String) {
            return ResponseEntity.ok(false);
        }

        String userEmail = authentication.getName();
        User user = userRepository.findByEmail(userEmail).orElse(null);
        if (user == null) {
            return ResponseEntity.ok(false);
        }

        Event event = eventRepository.findById(eventId).orElse(null);
        if (event == null) {
            return ResponseEntity.ok(false);
        }

        boolean isInterested = !interestsRepository.findByUserAndEvent(user, event).isEmpty();
        return ResponseEntity.ok(isInterested);
    }
}
