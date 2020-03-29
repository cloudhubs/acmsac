package com.example.polls.dto;

public class PresentationLinks {
  private String original;
  private String download;
  private String embed;

  public PresentationLinks(String original, String download, String embed) {
    this.original = original;
    this.download = download;
    this.embed = embed;
  }

  public String getOriginal() {
    return original;
  }

  public void setOriginal(String original) {
    this.original = original;
  }

  public String getDownload() {
    return download;
  }

  public void setDownload(String download) {
    this.download = download;
  }

  public String getEmbed() {
    return embed;
  }

  public void setEmbed(String embed) {
    this.embed = embed;
  }
}
