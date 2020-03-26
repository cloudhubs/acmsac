package com.example.polls.controller;

import com.example.polls.dto.UserDto;
import com.example.polls.repository.TrackRepository;
import com.example.polls.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chairs")
public class ChairController {
  @Autowired
  private TrackRepository trackRepository;

  @GetMapping("/bytrack/{trackCode}")
  public List<UserDto> getChairsByTrack(@PathVariable("trackCode") String trackCode) {
    return trackRepository.findByCodeIgnoreCase(trackCode).get().getChairs().stream().map(u -> new UserDto(u)).collect(Collectors.toList());
  }
}
