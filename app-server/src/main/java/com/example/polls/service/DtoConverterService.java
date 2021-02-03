package com.example.polls.service;

import com.example.polls.dto.PresentationDto;
import com.example.polls.dto.UserDto;
import com.example.polls.model.AcmInfo;
import com.example.polls.model.Presentation;
import com.example.polls.model.User;
import com.example.polls.repository.AcmInfoRepository;
import com.example.polls.security.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DtoConverterService {
  @Autowired
  AcmInfoRepository acmRepo;

  @Qualifier("customUserDetailsService")
  @Autowired
  UserDetailsService userDetailsServiceAuto;

  @Autowired
  SecurityService securityService;

  private static UserDetailsService userDetailsService;

  @PostConstruct
  public void init() {
    DtoConverterService.userDetailsService = userDetailsServiceAuto;
  }


  public PresentationDto getPresentationDto(Presentation pres) {
    return getPresentationDto(pres, false); // do the restriction check for individual presentation request
  }

  private PresentationDto getPresentationDto(Presentation pres, boolean alwaysRestrict) {
    boolean restrictPres = true; // assume we restrict the presentation until otherwise shown
    boolean restrictEdit = true;
    if (!alwaysRestrict && securityService.PresIsViewable(pres)) {
      restrictPres = false;
      if (securityService.PresIsEditable(pres)) {
        restrictEdit = false;
      }
    }
    PresentationDto dto = new PresentationDto(pres, restrictPres, restrictEdit);
    Optional<AcmInfo> info = acmRepo.findByPaperId(pres.getPaperId());
    if (info.isPresent()) {
      dto.setDoiUrl(info.get().getDoiUrl());
      dto.setAcmUrl(info.get().getAcmUrl());
    }
    return dto;
  }

  public List<PresentationDto> getPresentationDtoList(List<Presentation> presList) {
    // skip the restriction check and just always restrict if we are getting a big list of presentations (so we don't slow things up)
    return presList.stream().map(p -> getPresentationDto(p, true)).collect(Collectors.toList());
  }

  public static UserDto getUserDto(User user) {
    UserDetails details = userDetailsService.loadUserByUsername(user.getUsername());
    List<String> roles = details.getAuthorities().stream().map(Object::toString).collect(Collectors.toList());
    UserDto dto = new UserDto(user, roles);
    return dto;
  }
}
