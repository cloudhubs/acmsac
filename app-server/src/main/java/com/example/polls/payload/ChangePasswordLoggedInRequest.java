package com.example.polls.payload;

import lombok.Data;

@Data
public class ChangePasswordLoggedInRequest {
  private String newPassword;
  private String newPasswordConfirm;
}
