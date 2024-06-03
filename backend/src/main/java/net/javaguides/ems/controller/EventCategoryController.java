package net.javaguides.ems.controller;

import lombok.RequiredArgsConstructor;
import net.javaguides.ems.dto.EventCategoryDTO;
import net.javaguides.ems.service.EventCategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class EventCategoryController {
    private final EventCategoryService eventCategoryService;


    @GetMapping()
    public ResponseEntity<List<EventCategoryDTO>> getAllCategories() {
        List<EventCategoryDTO> categories = eventCategoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
}
