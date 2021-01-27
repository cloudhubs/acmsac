package com.example.polls.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "presentations", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "paperId"
        })
})
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
  private User presenter;

  private String type;

  @ManyToMany
  private List<User> authors = new ArrayList<>();

  // don't use Set, order matters
  @OneToMany
  List<Comment> comments = new ArrayList<>();

  public Presentation() {
  }

  public Presentation(String title, int paperId, String authorsString, String trackCode, String sessionCode,
                      String sessionChair, LocalDate date, String paperAbstract, String pageNumbers,
                      String acknowledgements, String videoEmbed, String slidesUrl, User presenter, String type) {
    this.title = title;
    this.paperId = paperId;
    this.authorsString = authorsString;
    this.trackCode = trackCode;
    this.sessionCode = sessionCode;
    this.sessionChair = sessionChair;
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
