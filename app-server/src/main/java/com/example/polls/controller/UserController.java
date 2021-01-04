package com.example.polls.controller;

import com.example.polls.dto.PresentationDto;
import com.example.polls.dto.UserDto;
import com.example.polls.dto.UserUpdateDto;
import com.example.polls.model.Presentation;
import com.example.polls.model.User;
import com.example.polls.payload.UserIdentityAvailability;
import com.example.polls.payload.UserSummary;
import com.example.polls.repository.PresentationRepository;
import com.example.polls.repository.RoleRepository;
import com.example.polls.repository.UserRepository;
import com.example.polls.security.CurrentUser;
import com.example.polls.security.UserPrincipal;
import com.example.polls.service.DtoConverterService;
import com.example.polls.service.ImportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PresentationRepository presentationRepository;

    @Autowired
    private ImportService importService;

    @Autowired
    private DtoConverterService dtoConverterService;

    @GetMapping("/user/me")
    public UserDto getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        User user = userRepository.findById(currentUser.getId()).get();
        return new UserDto(user);
    }

    @PutMapping("/user/me")
    public UserDto updateCurrentUser(@CurrentUser UserPrincipal currentUser, @RequestBody UserUpdateDto updatedUser) {
        User user = userRepository.findById(currentUser.getId()).get();
        user.setName(updatedUser.getName());
        user.setAffiliation(updatedUser.getAffiliation());
        user.setBio(updatedUser.getBio());
        user.setCountry(updatedUser.getCountry());
        user.setGoogleScholarUrl(updatedUser.getGoogleScholarUrl());
        user.setLinkedInUrl(updatedUser.getLinkedInUrl());
        user.setOrcid(updatedUser.getOrcid());
        user.setPicUrl(updatedUser.getPicUrl());
        user = userRepository.save(user);
        return new UserDto(user);
    }

    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    @PostMapping("/users/import")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> importUsers() {
        importService.importUsers();
        return ResponseEntity.ok("Users created!");
    }

    @GetMapping("/check/{email}")
    public ResponseEntity<List<PresentationDto>> checkUserPresentations(@PathVariable("email") String email) {
        if (userRepository.existsByEmail(email)) {
            User user = userRepository.findByEmail(email).get();
            List<PresentationDto> presentations = dtoConverterService.getPresentationDtoList(presentationRepository.findAllByPresenter(user));
//            List<PresentationDto> presentations = presentationRepository.findAllByPresenter(user)
//                    .stream().map(p -> new PresentationDto(p)).collect(Collectors.toList());
            return ResponseEntity.ok(presentations);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @GetMapping("/check/{email}/{presId}")
    public ResponseEntity<PresentationDto> checkSingleUserPresentation(@PathVariable("email") String email, @PathVariable("presId") long presId) {
        if (userRepository.existsByEmail(email)) {
            Optional<Presentation> presentation = presentationRepository.findById(presId);
            if (presentation.isPresent() && presentation.get().getPresenter().getEmail().equals(email)) {
                return ResponseEntity.ok(dtoConverterService.getPresentationDto(presentation.get()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

}
