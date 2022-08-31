package com.example.polls.controller;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.polls.dto.OrganizerDto;
import com.example.polls.dto.PresentationDto;
import com.example.polls.dto.UserDto;
import com.example.polls.dto.UserUpdateDto;
import com.example.polls.exception.AppException;
import com.example.polls.model.Presentation;
import com.example.polls.model.Role;
import com.example.polls.model.RoleName;
import com.example.polls.model.User;
import com.example.polls.payload.UserIdentityAvailability;
import com.example.polls.repository.PresentationRepository;
import com.example.polls.repository.RoleRepository;
import com.example.polls.repository.UserRepository;
import com.example.polls.security.CurrentUser;
import com.example.polls.security.UserPrincipal;
import com.example.polls.service.DtoConverterService;
import com.example.polls.service.ImportService;

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
        return DtoConverterService.getUserDto(user);
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
        return DtoConverterService.getUserDto(user);
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
    
    // THIS IS FOR SUPPORT PURPOSE ONLY! THEY'RE NOT FRONTEND REQUIREMENTS.
    @PostMapping("/assignPresenter")
    public ResponseEntity<PresentationDto> assignPresenter(@RequestParam("email") String email, @RequestParam("presId") long presId) {
        if (userRepository.existsByEmail(email)) {
        	Optional<User> user = userRepository.findByEmail(email);
            Optional<Presentation> presentation = presentationRepository.findById(presId);
            if (presentation.isPresent() && user.isPresent()) {
            	if(presentation.get().getPresenter().getId() != user.get().getId()) {
            		for (User author : presentation.get().getAuthors()) {
            			if (author.getId() == user.get().getId()) {
            				presentation.get().setPresenter(user.get());
                    		presentationRepository.save(presentation.get());
                    		break;
            			}
            		}
            	}            	
                return ResponseEntity.ok(dtoConverterService.getPresentationDto(presentation.get()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
    
    @PostMapping("/addOrganizer")
    public ResponseEntity<String> addOrganizer(@RequestBody List<OrganizerDto> organizerDtoList) {
    	try {
    		Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                    .orElseThrow(() -> new AppException("User Role not set."));
	    	for (OrganizerDto organizerDto : organizerDtoList) {
	    		if (organizerDto.getEmail() != null && !organizerDto.getEmail().isEmpty() && organizerDto.getName() != null && !organizerDto.getName().isEmpty()) {
	            	importService.createOrganizer(organizerDto.getEmail(), organizerDto.getName(), organizerDto.getAffilation(), organizerDto.getCountry(), Collections.singleton(userRole));
	            }
	    	}
	    	return ResponseEntity.ok("Success");
    	} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
    }

}
