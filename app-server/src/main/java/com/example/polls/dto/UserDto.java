package com.example.polls.dto;

import com.example.polls.model.User;
import com.example.polls.service.PostprocessingHelpers;
import lombok.Data;

import java.util.List;

@Data
public class UserDto {
  private Long id;
  private String name;
  private String email;
  private String affiliation;
  private String country;
  private String orcid;
  private String linkedInUrl;
  private String googleScholarUrl;
  private String bio;
  private String picUrl;
  private boolean blocked;
  private List<String> roles;

  public UserDto(User user, List<String> roles) {
    if (user == null) {
      return;
    }
    this.id = user.getId();
    this.name = user.getName();
    this.email = user.getEmail();
    this.affiliation = user.getAffiliation();
    this.country = user.getCountry();
    this.orcid = user.getOrcid();
    this.linkedInUrl = user.getLinkedInUrl();
    this.googleScholarUrl = user.getGoogleScholarUrl();
    this.bio = user.getBio();
    this.picUrl = user.getPicUrl() != null && !user.getPicUrl().isEmpty() ? PostprocessingHelpers.processPresentationLink(user.getPicUrl()).getEmbed() : "";
    this.blocked = user.isBlocked();
    this.roles = roles;
  }
}
