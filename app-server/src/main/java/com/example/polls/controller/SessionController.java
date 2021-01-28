package com.example.polls.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.polls.dto.SessionDto;
import com.example.polls.model.Session;
import com.example.polls.model.Track;
import com.example.polls.repository.SessionRepository;
import com.example.polls.repository.TrackRepository;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {
  @Autowired
  SessionRepository sessionRepository;

  @Autowired
  TrackRepository trackRepository;
  
  @PostMapping("/")
  public ResponseEntity<Void> createSession(@RequestBody SessionDto newSess) {
    // TODO: security lol
  	
  	// Get the track
  	Optional<Track> t = trackRepository.findByCodeIgnoreCase(newSess.getTrackCode());
  	if (t.isEmpty())
  		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

  	// Create the session
  	Session s = new Session(t.get(), newSess.getSessionCode(), newSess.getSessionChair(), newSess.getPrimaryStart(), newSess.getPrimaryEnd(), newSess.getSecondaryEnd(), newSess.getSecondaryEnd());
  	sessionRepository.save(s);
  	return ResponseEntity.status(HttpStatus.OK).body(null);
  }

  @GetMapping("/{trackCode}")
  public ResponseEntity<List<SessionDto>> getSessionsByTrack(@PathVariable String trackCode) {
  	Optional<Track> t = trackRepository.findByCodeIgnoreCase(trackCode);
  	if (t.isEmpty())
  		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
  	
  	Track track = t.get();
    List<Session> sessions = sessionRepository.findByTrack(track).orElse(new ArrayList<>());
    return ResponseEntity.ok(sessions.stream().map(s -> {
    	SessionDto dto = new SessionDto();
    	dto.setTrackCode(track.getCode());
    	dto.setSessionChair(s.getSessionChair());
    	dto.setSessionCode(s.getSessionCode());
    	dto.setPrimaryStart(s.getPrimaryStart());
    	dto.setPrimaryEnd(s.getPrimaryEnd());
    	dto.setSecondaryStart(s.getSecondaryStart());
    	dto.setSecondaryEnd(s.getSecondaryEnd());
    	return dto;
    }).collect(Collectors.toList()));
  }
}
