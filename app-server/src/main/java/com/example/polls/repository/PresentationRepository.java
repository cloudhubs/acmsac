package com.example.polls.repository;

import com.example.polls.model.Presentation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PresentationRepository extends JpaRepository<Presentation, Long> {
  Optional<Presentation> findByPaperId(int paperId);

  boolean existsByPaperId(int paperId);

  List<Presentation> findAllByTrackCodeIgnoreCase(String trackCode);
}
