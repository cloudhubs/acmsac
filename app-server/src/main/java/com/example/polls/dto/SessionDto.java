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

  String trackCode;

  Long sessionID;

  String sessionCode;
  
  String sessionChair;

  String primarySessionChair;
  
  String primaryMeetingLink;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = PATTERN, timezone = TZ)
  Instant primaryStart;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = PATTERN, timezone = TZ)
  Instant primaryEnd;

  String secondarySessionChair;

  String secondaryMeetingLink;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = PATTERN, timezone = TZ)
  Instant secondaryStart;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = PATTERN, timezone = TZ)
  Instant secondaryEnd;

  /** Presentations occurring within any room in this session */
  Set<Presentation> presentations;
}
