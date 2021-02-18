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

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn
  private Track track;

  private String sessionCode;

  @Lob
  private String primarySessionChair;

  private String primaryMeetingLink;

  private Instant primaryStart = Instant.now();

  private Instant primaryEnd = Instant.now();

  private String secondarySessionChair;

  private String secondaryMeetingLink;

  private Instant secondaryStart = Instant.now();

  private Instant secondaryEnd = Instant.now();

  /** Presentations occurring within any room in this session */
  @OneToMany(fetch = FetchType.EAGER, mappedBy = "session", cascade = {CascadeType.MERGE, CascadeType.PERSIST})
  @EqualsAndHashCode.Exclude
  private Set<Presentation> presentations = new HashSet<>();

  public Session(String sessionName, Track track, String sessionCode, String primarySessionChair,
      String primaryMeetingURL, Instant primaryStart, Instant primaryEnd, String secondarySessionChair,
      String secondaryMeetingURL, Instant secondaryStart, Instant secondaryEnd) {
    super();
    this.sessionName = sessionName;
    this.track = track;
    this.sessionCode = sessionCode;
    this.primarySessionChair = primarySessionChair;
    this.primaryMeetingLink = primaryMeetingURL;
    this.primaryStart = primaryStart;
    this.primaryEnd = primaryEnd;
    this.secondarySessionChair = secondarySessionChair;
    this.secondaryMeetingLink = secondaryMeetingURL;
    this.secondaryStart = secondaryStart;
    this.secondaryEnd = secondaryEnd;
  }
}
