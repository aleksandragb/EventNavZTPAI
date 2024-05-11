package net.javaguides.ems.repository;

import net.javaguides.ems.entity.Interests;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface InterestsRepository extends JpaRepository<Interests, Long> {
    List<Interests> findAllByUserEmail(String email);
}