package com.example.polls.repository;

import com.example.polls.model.Track;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TrackRepository extends JpaRepository<Track, Long> {
  Optional<Track> findByCodeIgnoreCase(String code);
}
