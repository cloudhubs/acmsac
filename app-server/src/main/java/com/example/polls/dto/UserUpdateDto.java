package com.example.polls.dto;

import lombok.Data;

@Data
public class UserUpdateDto {
  private String name;
  private String affiliation;
  private String country;
  private String orcid;
  private String linkedInUrl;
  private String googleScholarUrl;
  private String bio;
  private String picUrl;
}
