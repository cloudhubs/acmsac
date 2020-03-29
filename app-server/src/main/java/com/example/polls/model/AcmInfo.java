package com.example.polls.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class AcmInfo {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private int paperId;

  private String doiUrl;

  private String acmUrl;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public int getPaperId() {
    return paperId;
  }

  public void setPaperId(int paperId) {
    this.paperId = paperId;
  }

  public String getDoiUrl() {
    return doiUrl;
  }

  public void setDoiUrl(String doiUrl) {
    this.doiUrl = doiUrl;
  }

  public String getAcmUrl() {
    return acmUrl;
  }

  public void setAcmUrl(String acmUrl) {
    this.acmUrl = acmUrl;
  }
}
