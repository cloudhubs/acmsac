package com.example.polls.service;

import com.example.polls.dto.PresentationDto;
import com.example.polls.model.AcmInfo;
import com.example.polls.model.Presentation;
import com.example.polls.repository.AcmInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DtoConverterService {
  @Autowired
  AcmInfoRepository acmRepo;

  public PresentationDto getPresentationDto(Presentation pres) {
    PresentationDto dto = new PresentationDto(pres);
    Optional<AcmInfo> info = acmRepo.findByPaperId(pres.getPaperId());
    if (info.isPresent()) {
      dto.setDoiUrl(info.get().getDoiUrl());
      dto.setAcmUrl(info.get().getAcmUrl());
    }
    return dto;
  }

  public List<PresentationDto> getPresentationDtoList(List<Presentation> presList) {
    return presList.stream().map(this::getPresentationDto).collect(Collectors.toList());
  }
}
