package com.example.polls.controller;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.polls.dto.SessionDto;
import com.example.polls.model.Session;
import com.example.polls.model.Track;
import com.example.polls.repository.SessionRepository;
import com.example.polls.repository.TrackRepository;
import com.example.polls.service.DtoConverterService;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {
  @Autowired
  SessionRepository sessionRepository;

  @Autowired
  TrackRepository trackRepository;

  @Autowired
  DtoConverterService converter;

  @GetMapping("/")
  public ResponseEntity<List<SessionDto>> getAllSessions() {
    List<Session> sessions = sessionRepository.findAll();
    return ResponseEntity.ok(sessions.stream().map(converter::getSessionDto).collect(Collectors.toList()));
  }

  @PostMapping("/batch")
  public ResponseEntity<String> batchSessions(@RequestBody List<SessionDto> sessions) {
    for (SessionDto s : sessions) {
      ResponseEntity<String> resp = createSession(s);
      if (!resp.getStatusCode().is2xxSuccessful())
        return resp;
    }
    return ResponseEntity.ok("");
  }

  @PostMapping("/")
  public ResponseEntity<String> createSession(@RequestBody SessionDto newSess) {
    // TODO: security lol

    // Get the track
    Set<String> codes = newSess.getTrackCodes();
    Optional<Set<Track>> t = codes != null ? trackRepository.findAllByCodeIn(codes) : null;
    if (t != null && !t.isPresent())
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid track provided");

    // Create the session
    Session s = new Session(newSess.getSessionName(), newSess.getSessionCode(), t.get(),
        newSess.getPrimaryChair1(), newSess.getPrimaryChair2(), newSess.getPrimaryMeetingLink(),
        newSess.getPrimaryStart(), newSess.getPrimaryEnd(), newSess.getSecondaryChair1(), newSess.getSecondaryChair2(),
        newSess.getSecondaryMeetingLink(), newSess.getSecondaryStart(), newSess.getSecondaryEnd());
    sessionRepository.save(s);
    return ResponseEntity.ok("");
  }

  @GetMapping("/codes")
  public ResponseEntity<List<String>> getAllSessionCodes() {
    Optional<List<String>> codes = sessionRepository.findAllSessionCodes();
    if (!codes.isPresent())
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    return ResponseEntity.ok(codes.get());
  }
}
