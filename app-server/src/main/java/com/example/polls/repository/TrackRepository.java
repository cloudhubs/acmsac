package com.example.polls.repository;

import com.example.polls.model.Track;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrackRepository extends JpaRepository<Track, Long> {
  Track findByCodeIgnoreCase(String code);
}
