package com.example.polls.model;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sessions", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "sessionCode"
        })
})
@Data
@NoArgsConstructor
public class Session {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Lob
  private String sessionName;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn
  private Track track;

  private String sessionCode;
  
  @Lob
  private String sessionChair;
  
  private LocalDateTime primaryStart;
  
  private LocalDateTime primaryEnd;
  
  /** Extra date storage, if we have 2 sessions */
  private LocalDateTime secondaryStart;

  /** Extra date storage, if we have 2 sessions */
  private LocalDateTime secondaryEnd;

	public Session(String sessionName, Track track, String sessionCode, String sessionChair, LocalDateTime primaryStart, LocalDateTime primaryEnd,
	    LocalDateTime secondaryStart, LocalDateTime secondaryEnd) {
		super();
		this.sessionName = sessionName;
		this.track = track;
		this.sessionCode = sessionCode;
		this.sessionChair = sessionChair;
		this.primaryStart = primaryStart;
		this.primaryEnd = primaryEnd;
		this.secondaryStart = secondaryStart;
		this.secondaryEnd = secondaryEnd;
	}
}
