package com.example.polls.repository;

import com.example.polls.model.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.validation.constraints.NotNull;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    PasswordResetToken getFirstByEmailOrderByExpirationDateDesc(@NotNull String email);
}
