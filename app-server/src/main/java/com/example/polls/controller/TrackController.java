package com.example.polls.controller;

import com.example.polls.model.Track;
import com.example.polls.repository.TrackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}
