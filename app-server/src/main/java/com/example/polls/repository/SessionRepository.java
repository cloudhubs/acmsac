package com.example.polls.repository;

import com.example.polls.model.Session;
import com.example.polls.model.Track;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SessionRepository extends JpaRepository<Session, Long> {
  @Query("SELECT DISTINCT sessionCode FROM Session")
  Optional<List<String>> findAllSessionCodes();
}
