package com.example.polls.dto;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Data
public class PresentationUpdateDto {
  private String title;

  private String trackCode;

  private String sessionCode;

  private LocalDate date;

  private String paperAbstract;

  private String pageNumbers;

  private String acknowledgements;

  private String videoUrl;

  private String slidesUrl;

  private String doiUrl;
}
