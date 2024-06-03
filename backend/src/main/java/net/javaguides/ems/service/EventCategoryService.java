package net.javaguides.ems.service;

import lombok.RequiredArgsConstructor;
import net.javaguides.ems.dto.EventCategoryDTO;
import net.javaguides.ems.entity.EventCategory;
import net.javaguides.ems.repository.EventCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventCategoryService {
    private final EventCategoryRepository eventCategoryRepository;

    public List<EventCategoryDTO> getAllCategories() {
        return eventCategoryRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private EventCategoryDTO convertToDTO(EventCategory category) {
        return new EventCategoryDTO(category.getCategoryId(), category.getCategoryName());
    }
}
