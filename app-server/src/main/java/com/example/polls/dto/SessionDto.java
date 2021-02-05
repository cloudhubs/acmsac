package com.example.polls.dto;

import java.time.Instant;

import lombok.Data;

@Data
public class SessionDto {
  String sessionName;

  String trackCode;

  String sessionCode;
  
  String sessionChair;
  
  Instant primaryStart;
  
  Instant primaryEnd;
  
  /** Extra date storage, if we have 2 sessions */
  Instant secondaryStart;

  /** Extra date storage, if we have 2 sessions */
  Instant secondaryEnd;
}
