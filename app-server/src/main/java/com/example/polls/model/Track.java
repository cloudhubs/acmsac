package com.example.polls.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tracks", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "code"
        })
})
public class Track {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private String code;

  private String name;

  private String trackUrl;

  private String videoEmbed;

  @Lob
  private String acknowledgement;

  @Lob
  private String message;

  @Lob
  private String affiliations;

  @ManyToMany(fetch = FetchType.EAGER)
  private List<User> chairs = new ArrayList();

  // don't use Set, order matters
  @OneToMany
  private List<Comment> comments = new ArrayList<>();

  public Track() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getTrackUrl() {
    return trackUrl;
  }

  public void setTrackUrl(String trackUrl) {
    this.trackUrl = trackUrl;
  }

  public String getVideoEmbed() {
    return videoEmbed;
  }

  public void setVideoEmbed(String videoEmbed) {
    this.videoEmbed = videoEmbed;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public List<User> getChairs() {
    return chairs;
  }

  public void setChairs(List<User> coChairs) {
    this.chairs = coChairs;
  }

  public List<Comment> getComments() {
    return comments;
  }

  public void setComments(List<Comment> comments) {
    this.comments = comments;
  }

  public String getAcknowledgement() {
    return acknowledgement;
  }

  public void setAcknowledgement(String acknowledgement) {
    this.acknowledgement = acknowledgement;
  }

  public String getAffiliations() {
    return affiliations;
  }

  public void setAffiliations(String affiliations) {
    this.affiliations = affiliations;
  }
}
