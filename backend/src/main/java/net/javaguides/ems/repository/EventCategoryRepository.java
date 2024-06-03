package net.javaguides.ems.repository;

import net.javaguides.ems.entity.EventCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventCategoryRepository extends JpaRepository <EventCategory,Long> {
}
