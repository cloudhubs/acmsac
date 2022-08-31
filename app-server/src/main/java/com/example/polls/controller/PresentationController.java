package com.example.polls.controller;

import com.example.polls.dto.PresentationDto;
import com.example.polls.dto.PresentationLinks;
import com.example.polls.dto.PresentationUpdateDto;
import com.example.polls.exception.AppException;
import com.example.polls.model.Presentation;
import com.example.polls.model.Role;
import com.example.polls.model.RoleName;
import com.example.polls.model.User;
import com.example.polls.repository.PresentationRepository;
import com.example.polls.repository.RoleRepository;
import com.example.polls.repository.UserRepository;
import com.example.polls.security.CurrentUser;
import com.example.polls.security.UserPrincipal;
import com.example.polls.service.DtoConverterService;
import com.example.polls.service.ImportService;
import com.example.polls.service.PostprocessingHelpers;
import com.example.polls.service.PresentationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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

  @Autowired
  private PresentationService presentationService;
  
  @Autowired
  private ImportService importService;
  
  @Autowired
  private RoleRepository roleRepository;

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

  @GetMapping("/session/{sessionCode}")
  public List<PresentationDto> getAllBySession(@PathVariable String sessionCode) {
    return presentationRepository.findAllBySessionCodeIgnoreCase(sessionCode).parallelStream().map(dtoConverterService::getPresentationDto).collect(Collectors.toList());
//    return dtoConverterService.getPresentationDtoList();
  }

  @GetMapping("/user/{userid}")
  public List<PresentationDto> getAllByPresenter(@PathVariable("userid") Long userId) {
    Optional<User> user = userRepository.findById(userId);
    if (user.isPresent()) {
      List<Presentation> presentations = presentationRepository.findAllByAuthorsContaining(user.get());
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

  @PutMapping("/{id}")
  public ResponseEntity<PresentationDto> update(@PathVariable("id") long id, @RequestBody PresentationUpdateDto newPres) {
    // TODO: security lol
    Optional<Presentation> pres = presentationRepository.findById(id);
    if (pres.isPresent()) {
      Presentation realPres = pres.get();
      realPres = presentationService.editPres(newPres, realPres);
//      if (!realPres.getAuthors().stream().anyMatch(u -> u.getEmail().equals(email))) {
//        ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
//      }
      return ResponseEntity.ok(dtoConverterService.getPresentationDto(realPres));
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
  }
  
  // THIS IS FOR THE SUPPORT ONLY, THEY'RE NOT USED FROM THE FRONTEND
  
  @PostMapping("/importPresentation")
  public ResponseEntity<String> importPresentation(@RequestParam("papersResource") String papersResourceName, @RequestParam("authorsResource") String authorsResourceName) {
	  try {
		 Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
	              .orElseThrow(() -> new AppException("User Role not set."));
		importService.importAuthors("classpath:" + authorsResourceName, userRole);
		importService.importPresentations("classpath:" + papersResourceName);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(null); 
	} catch (IOException e) {
		e.printStackTrace();
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
  }
  
}
