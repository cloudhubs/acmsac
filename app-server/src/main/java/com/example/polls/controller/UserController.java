package com.example.polls.controller;

import com.example.polls.exception.AppException;
import com.example.polls.exception.ResourceNotFoundException;
import com.example.polls.model.Role;
import com.example.polls.model.RoleName;
import com.example.polls.model.User;
import com.example.polls.payload.*;
import com.example.polls.repository.PollRepository;
import com.example.polls.repository.RoleRepository;
import com.example.polls.repository.UserRepository;
import com.example.polls.repository.VoteRepository;
import com.example.polls.security.UserPrincipal;
import com.example.polls.service.PollService;
import com.example.polls.security.CurrentUser;
import com.example.polls.util.AppConstants;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    private PollService pollService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/hello")
    public List<Role> getRoles() {
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

    @GetMapping("/users/{username}")
    public UserProfile getUserProfile(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        long pollCount = pollRepository.countByCreatedBy(user.getId());
        long voteCount = voteRepository.countByUserId(user.getId());

        UserProfile userProfile = new UserProfile(user.getId(), user.getUsername(), user.getName(), user.getCreatedAt(), pollCount, voteCount);

        return userProfile;
    }

    @GetMapping("/users/{username}/polls")
    public PagedResponse<PollResponse> getPollsCreatedBy(@PathVariable(value = "username") String username,
                                                         @CurrentUser UserPrincipal currentUser,
                                                         @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                         @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return pollService.getPollsCreatedBy(username, currentUser, page, size);
    }


    @GetMapping("/users/{username}/votes")
    public PagedResponse<PollResponse> getPollsVotedBy(@PathVariable(value = "username") String username,
                                                       @CurrentUser UserPrincipal currentUser,
                                                       @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                       @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return pollService.getPollsVotedBy(username, currentUser, page, size);
    }

    @PostMapping("/users/import")
    public String importUsers(@RequestParam("file") MultipartFile file) throws IOException {
        final int EMAIL_CELL = 6;
        final int NAME_CELL = 5;
        StringBuilder sb = new StringBuilder();
        XSSFWorkbook workbook = new XSSFWorkbook(file.getInputStream());
        XSSFSheet worksheet = workbook.getSheetAt(0);
        for(int i=1; i<worksheet.getPhysicalNumberOfRows(); i++) {
            XSSFRow row = worksheet.getRow(i);
            String email = row.getCell(EMAIL_CELL).toString().trim();
            String fullName = row.getCell(NAME_CELL).toString().trim();
            String emailPrefix = email.substring(0, email.indexOf('@'));
            String username = emailPrefix; // we're going to try using the email prefix as username; if that's taken, we'll try appending a number
            // TODO: Change this! This is only for testing and should never be in production ever for any reason
            String password = "password";
            boolean skip = false;
            int usernameAppend = 1;

            if (userRepository.existsByEmail(email)) {
                sb.append("User with email " + email + " already exists, skipping");
            }
            else {
                while (userRepository.existsByUsername(username) && !skip) {
                    if (usernameAppend > 9) {
                        // if we can't get a valid username in 9 tries, something is wrong (or a lot of people have the same email prefix)
                        skip = true;
                        sb.append("Username " + emailPrefix + " could not be made unique in 9 tries, skipping\n");
                    } else {
                        sb.append("Username " + username + " already exists, appending " + usernameAppend + "\n");
                        username = emailPrefix + usernameAppend;
                        usernameAppend++;
                    }
                }

                if (!skip) {
                    User user = new User(fullName, username, email, password);
                    user.setPassword(passwordEncoder.encode(user.getPassword()));
                    Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                            .orElseThrow(() -> new AppException("User Role not set."));
                    user.setRoles(Collections.singleton(userRole));
                    User result = userRepository.save(user);
                    sb.append("User with username " + username + " and email " + email + " created.\n");
                }
            }
        }
        return sb.toString();
    }
}
