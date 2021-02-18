package com.example.polls.repository;

import com.example.polls.model.Track;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface TrackRepository extends JpaRepository<Track, Long> {
  Optional<Track> findByCodeIgnoreCase(String code);
  Optional<Set<Track>> findAllByCodeIn(Set<String> codes);
}
