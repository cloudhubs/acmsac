package com.example.polls.model;

import java.time.Instant;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Data;
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
  private String sessionChair;

  private String primaryMeetingLink;

  private Instant primaryStart;

  private Instant primaryEnd;

  private String secondaryMeetingLink;

  private Instant secondaryStart;

  private Instant secondaryEnd;

  public Session(String sessionName, Track track, String sessionCode, String sessionChair, String primaryMeetingURL,
      Instant primaryStart, Instant primaryEnd, String secondaryMeetingURL, Instant secondaryStart,
      Instant secondaryEnd) {
    super();
    this.sessionName = sessionName;
    this.track = track;
    this.sessionCode = sessionCode;
    this.sessionChair = sessionChair;
    this.primaryMeetingLink = primaryMeetingURL;
    this.primaryStart = primaryStart;
    this.primaryEnd = primaryEnd;
    this.secondaryMeetingLink = secondaryMeetingURL;
    this.secondaryStart = secondaryStart;
    this.secondaryEnd = secondaryEnd;
  }
}
