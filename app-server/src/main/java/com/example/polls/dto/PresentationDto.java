package com.example.polls.dto;

import com.example.polls.model.Comment;
import com.example.polls.model.Presentation;
import com.example.polls.model.User;

import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class PresentationDto {
  private Long id;
  private String title;
  private int paperId;
  private String trackCode;
  private String sessionCode;
  private String sessionChair;
  private LocalDate date;
  private String paperAbstract;
  private String pageNumbers;
  private String acknowledgements;
  private String videoEmbed;
  private String slidesUrl;
  private UserDto presenter;
  private List<UserDto> authors = new ArrayList<>();
  private List<Comment> comments = new ArrayList<>();

  public PresentationDto(Presentation presentation) {
    this.id = presentation.getId();
    this.title = presentation.getTitle();
    this.paperId = presentation.getPaperId();
    this.trackCode = presentation.getTrackCode();
    this.sessionCode = presentation.getSessionCode();
    this.sessionChair = presentation.getSessionChair();
    this.date = presentation.getDate();
    this.paperAbstract = presentation.getPaperAbstract();
    this.pageNumbers = presentation.getPageNumbers();
    this.acknowledgements = presentation.getAcknowledgements();
    this.videoEmbed = presentation.getVideoEmbed();
    this.slidesUrl = presentation.getSlidesUrl();
    this.presenter = new UserDto(presentation.getPresenter());
    this.authors = presentation.getAuthors().stream().map(u -> new UserDto(u)).collect(Collectors.toList());
    this.comments = presentation.getComments();
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

  public UserDto getPresenter() {
    return presenter;
  }

  public void setPresenter(UserDto presenter) {
    this.presenter = presenter;
  }

  public List<UserDto> getAuthors() {
    return authors;
  }

  public void setAuthors(List<UserDto> authors) {
    this.authors = authors;
  }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
