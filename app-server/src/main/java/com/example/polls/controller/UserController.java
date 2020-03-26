package com.example.polls.controller;

import com.example.polls.dto.PresentationDto;
import com.example.polls.exception.ResourceNotFoundException;
import com.example.polls.model.Presentation;
import com.example.polls.model.Role;
import com.example.polls.model.User;
import com.example.polls.payload.UserIdentityAvailability;
import com.example.polls.payload.UserSummary;
import com.example.polls.repository.PresentationRepository;
import com.example.polls.repository.RoleRepository;
import com.example.polls.repository.UserRepository;
import com.example.polls.security.CurrentUser;
import com.example.polls.security.UserPrincipal;
import com.example.polls.service.EmailService;
import com.example.polls.service.ImportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    private EmailService emailService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    // TODO: remove this api
    @GetMapping("/hello")
    public List<Role> getRoles(@RequestParam String to) {
        if (to != null && !to.trim().isEmpty()) {
            emailService.sendEmail("noreply@acmsac.ecs.baylor.edu", to, "ACM SAC Test", "ACM SAC 2020");
        }
        return roleRepository.findAll();
    }

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getName());
        return userSummary;
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
            List<PresentationDto> presentations = presentationRepository.findAllByPresenter(user)
                    .stream().map(p -> new PresentationDto(p)).collect(Collectors.toList());
            return ResponseEntity.ok(presentations);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @GetMapping("/check/{email}/{paperId}")
    public ResponseEntity<PresentationDto> checkSingleUserPresentation(@PathVariable("email") String email, @PathVariable("paperId") int paperId) {
        if (userRepository.existsByEmail(email)) {
            Optional<Presentation> presentation = presentationRepository.findByPaperId(paperId);
            if (presentation.isPresent() && presentation.get().getPresenter().getEmail().equals(email)) {
                return ResponseEntity.ok(new PresentationDto(presentation.get()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
}
