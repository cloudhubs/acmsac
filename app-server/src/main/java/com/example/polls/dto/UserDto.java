package com.example.polls.dto;

import com.example.polls.model.User;
import com.example.polls.service.PostprocessingHelpers;

public class UserDto {
  private String name;
  private String affiliation;
  private String country;
  private String orcid;
  private String linkedInUrl;
  private String googleScholarUrl;
  private String bio;
  private String picUrl;

  public UserDto() {}

  public UserDto(User user) {
    this.name = user.getName();
    this.affiliation = user.getAffiliation();
    this.country = user.getCountry();
    this.orcid = user.getOrcid();
    this.linkedInUrl = user.getLinkedInUrl();
    this.googleScholarUrl = user.getGoogleScholarUrl();
    this.bio = user.getBio();
    this.picUrl = user.getPicUrl() != null && !user.getPicUrl().isEmpty() ? PostprocessingHelpers.processPresentationLink(user.getPicUrl()).getEmbed() : "";
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getAffiliation() {
    return affiliation;
  }

  public void setAffiliation(String affiliation) {
    this.affiliation = affiliation;
  }

  public String getCountry() {
    return country;
  }

  public void setCountry(String country) {
    this.country = country;
  }

  public String getOrcid() {
    return orcid;
  }

  public void setOrcid(String orcid) {
    this.orcid = orcid;
  }

  public String getLinkedInUrl() {
    return linkedInUrl;
  }

  public void setLinkedInUrl(String linkedInUrl) {
    this.linkedInUrl = linkedInUrl;
  }

  public String getGoogleScholarUrl() {
    return googleScholarUrl;
  }

  public void setGoogleScholarUrl(String googleScholarUrl) {
    this.googleScholarUrl = googleScholarUrl;
  }

  public String getBio() {
    return bio;
  }

  public void setBio(String bio) {
    this.bio = bio;
  }

  public String getPicUrl() {
    return picUrl;
  }

  public void setPicUrl(String picUrl) {
    this.picUrl = picUrl;
  }
}
