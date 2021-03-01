package com.example.polls.controller;

import com.example.polls.model.Track;
import com.example.polls.model.User;
import com.example.polls.repository.TrackRepository;
import com.example.polls.security.CurrentUser;
import com.example.polls.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tracks")
public class TrackController {
  @Autowired
  TrackRepository trackRepository;

  @GetMapping
  public List<Track> getAllTracks() {
    return trackRepository.findAll();
  }

  @GetMapping("/{trackCode}")
  public Track getTrackByCode(@PathVariable String trackCode) {
    return trackRepository.findByCodeIgnoreCase(trackCode).orElse(null);
  }

  @PutMapping("/{trackCode}/message")
  public ResponseEntity updateTrackMessage(@PathVariable String trackCode, @RequestBody String newMessage, @CurrentUser UserPrincipal user) {
    Optional<Track> track = trackRepository.findByCodeIgnoreCase(trackCode);
    if (!track.isPresent()) {
      return ResponseEntity.notFound().build();
    }

    Track realTrack = track.get();

    boolean userIsAdmin = user.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
    boolean userIsRightChair = user.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_CHAIR"))
            && realTrack.getChairs().stream().anyMatch(u -> u.getEmail().equals(user.getEmail()));
    if (!(userIsAdmin || userIsRightChair)) {
      return ResponseEntity.status(403).build();
    }
    realTrack.setMessage(newMessage);
    realTrack = trackRepository.save(realTrack);
    return ResponseEntity.of(Optional.of(realTrack));
  }
}
