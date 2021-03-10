package com.example.polls.service;

import com.example.polls.model.PasswordResetToken;
import com.example.polls.model.User;
import com.example.polls.payload.ApiResponse;
import com.example.polls.payload.ChangePasswordLoggedInRequest;
import com.example.polls.payload.ChangePasswordRequest;
import com.example.polls.repository.PasswordResetTokenRepository;
import com.example.polls.repository.UserRepository;
import com.example.polls.security.UserPrincipal;
import org.apache.commons.lang3.time.DateUtils;
import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public PasswordService(UserRepository userRepository, PasswordResetTokenRepository passwordResetTokenRepository, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    public ResponseEntity<?> changePassword(ChangePasswordRequest changePasswordRequest) {

        if (!userRepository.existsByEmail(changePasswordRequest.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address doesn't exist in whitelist!"), HttpStatus.BAD_REQUEST);
        }

        Optional<User> userOpt = userRepository.findByEmail(changePasswordRequest.getEmail());

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            user.setPassword(passwordEncoder.encode(changePasswordRequest.getPassword()));

            User result = userRepository.save(user);

            URI location = ServletUriComponentsBuilder
                    .fromCurrentContextPath().path("/users/{username}")
                    .buildAndExpand(result.getUsername()).toUri();

            return ResponseEntity.created(location).body(new ApiResponse(true, "User password changed successfully"));
        }

        return new ResponseEntity(new ApiResponse(false, "User doesn't exist!"), HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<?> generatePasswordResetToken(String email) {

        if (!userRepository.existsByEmail(email)) {
            return new ResponseEntity(new ApiResponse(false, "Email address doesn't exist in whitelist!"), HttpStatus.BAD_REQUEST);
        }

        // don't allow password reset within 30 minutes
        PasswordResetToken oldToken = passwordResetTokenRepository.getFirstByEmailOrderByExpirationDateDesc(email);
        if (oldToken != null && !hasTokenExpired(oldToken)) {
            return new ResponseEntity(new ApiResponse(false, "Sorry, password reset request made recently. Please wait 30 minutes before requesting again."), HttpStatus.BAD_REQUEST);
        }

        // generate new PasswordResetToken
        PasswordResetToken newToken = new PasswordResetToken();
        newToken.setToken(UUID.randomUUID().toString()); // use UUID as token
        newToken.setEmail(email);
        newToken.setExpirationDate(DateUtils.addMinutes(new Date(), 30));
        passwordResetTokenRepository.save(newToken);

        // send email
        try {
            sendPasswordResetLink(email, newToken);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(new ApiResponse(false, "Failed to send email!"), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity(new ApiResponse(true, "Password reset link set to email."), HttpStatus.OK);
    }

    public ResponseEntity<?> resetPassword(Long id, String token) {

        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findById(id).orElse(null);
        if (passwordResetToken == null || !passwordResetToken.getToken().equals(token)) {
            return new ResponseEntity(new ApiResponse(false, "Sorry, invalid token!"), HttpStatus.BAD_REQUEST);
        }
        if (hasTokenExpired(passwordResetToken)) {
            return new ResponseEntity(new ApiResponse(false, "Sorry, token expired!"), HttpStatus.BAD_REQUEST);
        }

        // mark the token as used
        passwordResetToken.setUsed(true);
        passwordResetTokenRepository.save(passwordResetToken);

        User user = userRepository.findByEmail(passwordResetToken.getEmail()).orElse(null);
        if (user == null) {
            return new ResponseEntity(new ApiResponse(false, "User doesn't exist"), HttpStatus.BAD_REQUEST);
        }

        // generate random password
        String newPassword = generateRandomPassword();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // send email
        try {
            sendNewPassword(user.getEmail(), newPassword);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(new ApiResponse(false, "Failed to send email!"), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity(new ApiResponse(true, "Password changed, check your email for new password!"), HttpStatus.BAD_REQUEST);
    }

    private boolean hasTokenExpired(PasswordResetToken token) {
        return token.isUsed() || new Date().compareTo(token.getExpirationDate()) >= 0;
    }

    private String generateRandomPassword() {
        return new PasswordGenerator().generatePassword(6,
                new CharacterRule(EnglishCharacterData.LowerCase, 4),
                new CharacterRule(EnglishCharacterData.Digit, 2)
        );
    }

    private void sendPasswordResetLink(String email, PasswordResetToken token) throws Exception {
        String link = "https://acmsac.ecs.baylor.edu/api/auth/resetPassword/confirm/" + token.getId() + "/" + token.getToken();

        String content = "<p>Follow the link to reset your password. Please ignore this email if you have not made any password change requests.</p>" +
                "<p><a href=\"#link\">#link</a></p>" + "<p>- ACM SAC</p>";

        content = content.replaceAll("#link", link);

        emailService.sendEmail("noreply@acmsac.ecs.baylor.edu", email, "ACM SAC 2021: Password Reset", content);
    }

    private void sendNewPassword(String email, String password) throws Exception {
        String content = "<p>Your password is autogenerated. Use <strong>#password</strong> as your new password.</p>" +
                "<p>- ACM SAC</p>";

        content = content.replace("#password", password);

        emailService.sendEmail("noreply@acmsac.ecs.baylor.edu", email, "ACM SAC 2021: New Password", content);
    }

    public ResponseEntity<?> resetPasswordLoggedIn(UserPrincipal currentUser, ChangePasswordLoggedInRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(currentUser.getEmail());

        if (!userOpt.isPresent()) {
            return new ResponseEntity(new ApiResponse(false, "Bad user!"), HttpStatus.BAD_REQUEST);
        }

        if (!request.getNewPassword().equals(request.getNewPasswordConfirm())) {
            return new ResponseEntity(new ApiResponse(false, "Passwords do not match!"), HttpStatus.BAD_REQUEST);
        }

        if (request.getNewPassword().length() < 8) {
            return new ResponseEntity(new ApiResponse(false, "Password too short!"), HttpStatus.BAD_REQUEST);
        }

        User user = userOpt.get();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        User result = userRepository.save(user);

        return ResponseEntity.ok().body(new ApiResponse(true, "User password changed successfully"));

    }
}
