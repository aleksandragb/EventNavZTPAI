package net.javaguides.ems.repository;

import net.javaguides.ems.entity.Event;
import net.javaguides.ems.entity.Interests;
import net.javaguides.ems.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface InterestsRepository extends JpaRepository<Interests, Long> {
    List<Interests> findAllByUserEmail(String email);
    List<Interests> findByUserAndEvent(User user, Event event);


}