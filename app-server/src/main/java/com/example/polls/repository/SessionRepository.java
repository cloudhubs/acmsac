package com.example.polls.repository;

import com.example.polls.model.Session;
import com.example.polls.model.Track;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SessionRepository extends JpaRepository<Session, Long> {
  Optional<Session> findBySessionCodeIgnoreCase(String sessionCode);
  Optional<List<Session>> findByTrack(Track t);
}
