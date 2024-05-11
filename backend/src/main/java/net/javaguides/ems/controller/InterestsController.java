package net.javaguides.ems.controller;

import lombok.RequiredArgsConstructor;
import net.javaguides.ems.service.InterestsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/interests")
@RequiredArgsConstructor
public class InterestsController {

    private final InterestsService interestsService;

    @PostMapping("/add/{eventId}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<String> addInterest(@PathVariable Long eventId) {
        interestsService.addInterest(eventId);
        return ResponseEntity.ok("Event added to favorites.");
    }
}
