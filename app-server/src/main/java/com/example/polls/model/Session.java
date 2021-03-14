package com.example.polls.model;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sessions")
@Data
@NoArgsConstructor
public class Session {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Lob
  private String sessionName;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinColumn
  private Set<Track> tracks = new HashSet<>();

  private String sessionCode;

  @Lob
  private String primaryChair1, primaryChair2;

  private String primaryMeetingLink;

  private Instant primaryStart = Instant.now();

  private Instant primaryEnd = Instant.now();

  private String secondaryChair1, secondaryChair2;

  private String secondaryMeetingLink;

  private Instant secondaryStart = null;

  private Instant secondaryEnd = null;

  /** Presentations occurring within any room in this session */
  @OneToMany(fetch = FetchType.EAGER, mappedBy = "session", cascade = { CascadeType.MERGE, CascadeType.PERSIST })
  @EqualsAndHashCode.Exclude
  private Set<Presentation> presentations = new HashSet<>();

  public Session(String sessionName, String sessionCode, Set<Track> tracks, String primaryChair1, String primaryChair2,
      String primaryMeetingURL, Instant primaryStart, Instant primaryEnd, String secondaryChair1,
      String secondaryChair2, String secondaryMeetingURL, Instant secondaryStart, Instant secondaryEnd) {
    super();
    this.sessionName = sessionName;
    this.sessionCode = sessionCode;
    this.tracks = tracks;
    this.primaryChair1 = primaryChair1;
    this.primaryChair2 = primaryChair2;
    this.primaryMeetingLink = primaryMeetingURL;
    this.primaryStart = primaryStart;
    this.primaryEnd = primaryEnd;
    this.secondaryChair1 = secondaryChair1;
    this.secondaryChair2 = secondaryChair2;
    this.secondaryMeetingLink = secondaryMeetingURL;
    this.secondaryStart = secondaryStart;
    this.secondaryEnd = secondaryEnd;
  }
}
