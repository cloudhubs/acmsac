package com.example.polls.dto;

import java.time.Instant;
import java.util.Set;

import com.example.polls.model.Presentation;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class SessionDto {
  private static final String PATTERN = "yyyy-MM-dd'T'HH:mm:ssXXX";
  private static final String TZ = "UTC";
  
  String sessionName;

  Set<String> trackCodes;

  Long sessionID;

  String sessionCode;
  
  String sessionChair;

  String primaryChair1, primaryChair2;
  
  String primaryMeetingLink;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = PATTERN, timezone = TZ)
  Instant primaryStart;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = PATTERN, timezone = TZ)
  Instant primaryEnd;

  String secondaryChair1, secondaryChair2;

  String secondaryMeetingLink;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = PATTERN, timezone = TZ)
  Instant secondaryStart;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = PATTERN, timezone = TZ)
  Instant secondaryEnd;

  /** Presentations occurring within any room in this session */
  Set<Presentation> presentations;
}
