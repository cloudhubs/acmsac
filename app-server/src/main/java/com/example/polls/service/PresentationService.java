package com.example.polls.service;

import com.example.polls.dto.PresentationUpdateDto;
import com.example.polls.model.Presentation;
import com.example.polls.repository.PresentationRepository;
import com.example.polls.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class PresentationService {
  @Autowired
  private SecurityService securityService;

  @Autowired
  private PresentationRepository presentationRepository;

  @PreAuthorize("@securityService.PresIsEditable(#oldPres)")
  public Presentation editPres(PresentationUpdateDto newPres, Presentation oldPres) {
    oldPres.setTitle(newPres.getTitle());
    oldPres.setTrackCode(newPres.getTrackCode());
    oldPres.setSessionCode(newPres.getSessionCode()); // TODO: this probably just breaks everything
    oldPres.setDate(newPres.getDate());
    oldPres.setPaperAbstract(newPres.getPaperAbstract());
    oldPres.setPageNumbers(newPres.getPageNumbers());
    oldPres.setAcknowledgements(newPres.getAcknowledgements());
    if (newPres.getSlidesUrl() != null && !newPres.getSlidesUrl().trim().equals("")) {
      oldPres.setSlidesUrl(newPres.getSlidesUrl());
    }
    oldPres.setDoiUrl(newPres.getDoiUrl());
    String youtubeEmbed = PostprocessingHelpers.getYoutubeEmbed(newPres.getVideoUrl());
    if (!youtubeEmbed.trim().equals("")) { // only change embed if valid youtube URL was given
      oldPres.setVideoEmbed(youtubeEmbed);
    }
    return presentationRepository.save(oldPres);
  }

}
