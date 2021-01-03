package com.example.polls.controller;

import com.example.polls.dto.PresentationDto;
import com.example.polls.model.Presentation;
import com.example.polls.model.User;
import com.example.polls.repository.PresentationRepository;
import com.example.polls.repository.UserRepository;
import com.example.polls.service.DtoConverterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/presentations")
public class PresentationController {
  @Autowired
  private PresentationRepository presentationRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private DtoConverterService dtoConverterService;

  @GetMapping
  public List<PresentationDto> getAll() {
    return dtoConverterService.getPresentationDtoList(presentationRepository.findAll());
    // return presentationRepository.findAll().stream().map(p -> new PresentationDto(p)).collect(Collectors.toList());
  }

  @GetMapping("/bytrack/{trackCode}")
  public List<PresentationDto> getAllByTrack(@PathVariable("trackCode") String trackCode) {
    return dtoConverterService.getPresentationDtoList(presentationRepository.findAllByTrackCodeIgnoreCase(trackCode));
    //return presentationRepository.findAllByTrackCodeIgnoreCase(trackCode).stream().map(p -> new PresentationDto(p)).collect(Collectors.toList());
  }

  @GetMapping("/user/{userid}")
  public List<PresentationDto> getAllByPresenter(@PathVariable("userid") Long userId) {
    Optional<User> presenter = userRepository.findById(userId);
    if (presenter.isPresent()) {
      List<Presentation> presentations = presentationRepository.findAllByPresenter(presenter.get());
      return dtoConverterService.getPresentationDtoList(presentations);
    }
    return new ArrayList<>();
  }

  @GetMapping("/{id}")
  public ResponseEntity<PresentationDto> get(@PathVariable("id") Long id) {
    Optional<Presentation> pres = presentationRepository.findById(id);
    if (pres.isPresent()) {
      return ResponseEntity.ok(dtoConverterService.getPresentationDto(pres.get()));
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
  }
}
