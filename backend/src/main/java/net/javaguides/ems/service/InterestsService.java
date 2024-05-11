package net.javaguides.ems.service;

import lombok.RequiredArgsConstructor;
import net.javaguides.ems.entity.Event;
import net.javaguides.ems.entity.Interests;
import net.javaguides.ems.entity.User;
import net.javaguides.ems.repository.EventRepository;
import net.javaguides.ems.repository.InterestsRepository;
import net.javaguides.ems.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InterestsService {

    private final InterestsRepository interestsRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public void addInterest(Long eventId) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found."));
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found."));

        Interests interest = new Interests();
        interest.setUser(user);
        interest.setEvent(event);
        interestsRepository.save(interest);
    }
}

