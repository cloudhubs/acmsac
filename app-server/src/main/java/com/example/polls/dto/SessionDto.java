package com.example.polls.dto;

import java.time.Instant;

import lombok.Data;

@Data
public class SessionDto {
  String sessionName;

  String trackCode;

  String sessionCode;
  
  String sessionChair;
  
  String primaryMeetingLink;
  
  Instant primaryStart;
  
  Instant primaryEnd;

  String secondaryMeetingLink;

  Instant secondaryStart;

  Instant secondaryEnd;
}
