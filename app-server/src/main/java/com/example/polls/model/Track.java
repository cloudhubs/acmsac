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
  private String message;

  @ManyToOne
  private User chair;

  @ManyToMany
  private List<User> coChairs = new ArrayList();

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

  public User getChair() {
    return chair;
  }

  public void setChair(User chair) {
    this.chair = chair;
  }

  public List<User> getCoChairs() {
    return coChairs;
  }

  public void setCoChairs(List<User> coChairs) {
    this.coChairs = coChairs;
  }
}
