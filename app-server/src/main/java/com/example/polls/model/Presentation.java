package com.example.polls.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "presentations", uniqueConstraints = { @UniqueConstraint(columnNames = { "paperId" }) })
@Data
public class Presentation {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @NotNull
  private String title;

  private int paperId;

  @Lob
  private String authorsString;

  private String trackCode;

  private String sessionCode;

  @Lob
  private String sessionChair;

  private String sessionMeeting;

  private LocalDate date;

  @Lob
  private String paperAbstract;

  @Lob
  private String pageNumbers;

  @Lob
  private String acknowledgements;

  @Lob
  private String videoEmbed;

  @Lob
  private String slidesUrl;

  @Lob
  private String doiUrl;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinTable(
    name = "presentations_sessions",
    joinColumns = {@JoinColumn(name="presentations_id", referencedColumnName = "id")},
    inverseJoinColumns = {@JoinColumn(name="session_id", referencedColumnName = "id")}
  )
  @EqualsAndHashCode.Exclude
  @JsonIgnore
  private Session session;

  // CANDIDATES FOR DELETION
  private Instant primaryStart, primaryEnd;

  private Instant secondaryStart, secondaryEnd;

  /**
   * Indicates the author does not want this presentation shown to others
   */
  private boolean hideFromPublic;

  /**
   * Indicates the release date for the presentation has not come up yet
   */
  private boolean released;

  @ManyToOne
  @JoinColumn(name = "user_id")
  @EqualsAndHashCode.Exclude
  private User presenter;

  private String type;

  @ManyToMany
  @EqualsAndHashCode.Exclude
  private List<User> authors = new ArrayList<>();

  // don't use Set, order matters
  @OneToMany
  @EqualsAndHashCode.Exclude
  List<Comment> comments = new ArrayList<>();

  public Presentation() {
  }

  public Presentation(String title, int paperId, String authorsString, String trackCode, String sessionCode,
      LocalDate date, String paperAbstract, String pageNumbers, String acknowledgements, String videoEmbed,
      String slidesUrl, User presenter, String type) {
    this.title = title;
    this.paperId = paperId;
    this.authorsString = authorsString;
    this.trackCode = trackCode;
    this.sessionCode = sessionCode;
    this.date = date;
    this.paperAbstract = paperAbstract;
    this.pageNumbers = pageNumbers;
    this.acknowledgements = acknowledgements;
    this.videoEmbed = videoEmbed;
    this.slidesUrl = slidesUrl;
    this.presenter = presenter;
    this.type = type;
  }
}
