package com.example.polls.controller;

import com.example.polls.dto.PresentationDto;
import com.example.polls.model.Presentation;
import com.example.polls.repository.PresentationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/presentations")
public class PresentationController {
  @Autowired
  private PresentationRepository presentationRepository;

  @GetMapping
  public List<PresentationDto> getAll() {
    return presentationRepository.findAll().stream().map(p -> new PresentationDto(p)).collect(Collectors.toList());
  }

  @GetMapping("/bytrack/{trackCode}")
  public List<PresentationDto> getAllByTrack(@PathVariable("trackCode") String trackCode) {
    return presentationRepository.findAllByTrackCodeIgnoreCase(trackCode).stream().map(p -> new PresentationDto(p)).collect(Collectors.toList());
  }

  @GetMapping("/{id}")
  public ResponseEntity<PresentationDto> get(@PathVariable("id") Long id) {
    Optional<Presentation> pres = presentationRepository.findById(id);
    if (pres.isPresent()) {
      return ResponseEntity.ok(new PresentationDto(pres.get()));
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
  }
}
