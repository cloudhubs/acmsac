package com.example.polls.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class SessionDto {
  String trackCode;

  String sessionCode;
  
  String sessionChair;
  
  LocalDateTime primaryStart;
  
  LocalDateTime primaryEnd;
  
  /** Extra date storage, if we have 2 sessions */
  LocalDateTime secondaryStart;

  /** Extra date storage, if we have 2 sessions */
  LocalDateTime secondaryEnd;
}
