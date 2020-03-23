package com.example.polls.model;

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

  private String sessionChair;

  private LocalDate date;

  @Lob
  private String paperAbstract;

  private String pageNumbers;

  @Lob
  private String acknowledgements;

  @Lob
  private String videoEmbed;

  private String slidesUrl;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User presenter;

  @ManyToMany
  private List<User> authors = new ArrayList<>();

  public Presentation() {
  }

  public Presentation(String title, int paperId, String authorsString, String trackCode, String sessionCode,
                      String sessionChair, LocalDate date, String paperAbstract, String pageNumbers,
                      String acknowledgements, String videoEmbed, String slidesUrl, User presenter) {
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
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public int getPaperId() {
    return paperId;
  }

  public void setPaperId(int paperId) {
    this.paperId = paperId;
  }

  public String getAuthorsString() {
    return authorsString;
  }

  public void setAuthorsString(String authors) {
    this.authorsString = authors;
  }

  public String getTrackCode() {
    return trackCode;
  }

  public void setTrackCode(String trackCode) {
    this.trackCode = trackCode;
  }

  public String getSessionCode() {
    return sessionCode;
  }

  public void setSessionCode(String sessionCode) {
    this.sessionCode = sessionCode;
  }

  public String getSessionChair() {
    return sessionChair;
  }

  public void setSessionChair(String sessionChair) {
    this.sessionChair = sessionChair;
  }

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

  public String getPaperAbstract() {
    return paperAbstract;
  }

  public void setPaperAbstract(String paperAbstract) {
    this.paperAbstract = paperAbstract;
  }

  public String getPageNumbers() {
    return pageNumbers;
  }

  public void setPageNumbers(String pageNumbers) {
    this.pageNumbers = pageNumbers;
  }

  public String getAcknowledgements() {
    return acknowledgements;
  }

  public void setAcknowledgements(String acknowledgements) {
    this.acknowledgements = acknowledgements;
  }

  public String getVideoEmbed() {
    return videoEmbed;
  }

  public void setVideoEmbed(String videoEmbed) {
    this.videoEmbed = videoEmbed;
  }

  public String getSlidesUrl() {
    return slidesUrl;
  }

  public void setSlidesUrl(String slidesUrl) {
    this.slidesUrl = slidesUrl;
  }

  public User getPresenter() {
    return presenter;
  }

  public void setPresenter(User presenter) {
    this.presenter = presenter;
  }

  public List<User> getAuthors() {
    return authors;
  }

  public void setAuthors(List<User> authors) {
    this.authors = authors;
  }
}