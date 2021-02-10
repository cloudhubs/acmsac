package com.example.polls.dto;

import com.example.polls.model.Comment;
import com.example.polls.model.Presentation;
import com.example.polls.model.User;
import com.example.polls.service.DtoConverterService;
import com.example.polls.service.PostprocessingHelpers;
import lombok.Data;

import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
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
  private PresentationLinks presentation;
  private String doiUrl;
  private String acmUrl;
  private UserDto presenter;
  private String type;
  private boolean hideFromPublic;
  private boolean released;
  private boolean userCanView;
  private boolean userCanEdit;
  private List<UserDto> authors = new ArrayList<>();
  private List<Comment> comments = new ArrayList<>();
  private LocalDateTime primaryStart, primaryEnd;
  private LocalDateTime secondaryStart, secondaryEnd;

  /**
   *
   * @param presentation
   * @param isViewRestricted User cannot view presentation (frontend helper, presentation/video will be empty)
   * @param isEditRestricted User cannot edit presentation (frontend helper, security done elsewhere)
   */
  public PresentationDto(Presentation presentation, boolean isViewRestricted, boolean isEditRestricted) {
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
    this.presenter = DtoConverterService.getUserDto(presentation.getPresenter());
    this.authors = presentation.getAuthors().stream().map(DtoConverterService::getUserDto).collect(Collectors.toList());
    this.comments = presentation.getComments();
    this.type = presentation.getType();
    this.hideFromPublic = presentation.isHideFromPublic();
    this.released = presentation.isReleased();
    this.userCanView = !restricted;
    this.primaryStart = presentation.getPrimaryStart();
    this.primaryEnd = presentation.getPrimaryEnd();
    this.secondaryStart = presentation.getSecondaryStart();
    this.secondaryEnd = presentation.getSecondaryEnd();
    this.userCanView = !isViewRestricted;
    this.userCanEdit = !isEditRestricted;

    // restrict view, if necessary
    this.videoEmbed = isViewRestricted ? "" : presentation.getVideoEmbed();
    this.presentation = isViewRestricted ? new PresentationLinks("", "", "")
            : PostprocessingHelpers.processPresentationLink(presentation.getSlidesUrl());
  }

}
