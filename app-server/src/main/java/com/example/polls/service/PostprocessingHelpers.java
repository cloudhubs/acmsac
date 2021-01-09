package com.example.polls.service;

import com.example.polls.dto.PresentationDto;
import com.example.polls.dto.PresentationLinks;
import com.example.polls.model.Presentation;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PostprocessingHelpers {
  private static final String DRIVE_EMBED_BASE = "https://drive.google.com/file/d/";
  private static final String DRIVE_DOWNLOAD_BASE = "https://drive.google.com/u/0/uc";
  private static final String DRIVE_EMBED_END = "/preview";
  private static final String DRIVE_DOWNLOAD_END = "&amp;export=download";

  private static final String DROPBOX_BAD_QUERY = "?dl=0";
  private static final String DROPBOX_GOOD_QUERY = "?raw=1";

  private static final String GITHUB_BASE = "https://docs.google.com/viewer?url=";
  private static final String GITHUB_END = "&embedded=true";

  public static PresentationLinks processPresentationLink(String original) {
    if (!original.contains("https://") && original.contains("http://")) {
      original = original.replace("http://", "https://");
    }
    try {
      URL url = new URL(original);

      if (url.getHost().contains("drive.google.com")) {
        String query = url.getQuery();
        String id = "";
        String[] pathPieces = url.getPath().split("/");
        boolean haveId = false;
        if (query != null) {
          String[] queryPieces = query.split("=");
          if (queryPieces.length > 1 && queryPieces[0].equals("id")) {
            id = queryPieces[1];
            haveId = true;
          }
        }
        if (!haveId) {
          if (pathPieces[pathPieces.length-1].contains("view") || pathPieces[pathPieces.length-1].contains("edit")) {
            id = pathPieces[pathPieces.length-2];
          } else {
            id = pathPieces[pathPieces.length-1];
          }
        }
        String download = DRIVE_DOWNLOAD_BASE + "?id=" + id + DRIVE_DOWNLOAD_END;
        String embed = DRIVE_EMBED_BASE + id + DRIVE_EMBED_END;
        return new PresentationLinks(original, download, embed);
      }

      if (url.getHost().contains("dropbox.com")) {
        String query = url.getQuery();
        String download, embed;
        if (query != null) {
          download = embed = original.replace(DROPBOX_BAD_QUERY, DROPBOX_GOOD_QUERY);
        } else {
          download = embed = original + DROPBOX_GOOD_QUERY;
        }
        return new PresentationLinks(original, download, embed);
      }

      if (url.getHost().contains("github.com")) {
        original = original.replace("blob/master", "raw/master");
        String download, embed;
        download = embed = GITHUB_BASE + original + GITHUB_END;
        return new PresentationLinks(original, download, embed);
      }

      // if we get here, no further processing was needed
      return new PresentationLinks(original, original, original);
    } catch (Exception e) {
      e.printStackTrace();
      // just skip it
      return new PresentationLinks(original, original, original);
    }
  }

  public static String getYoutubeEmbed(String url) {
    Pattern pattern = Pattern.compile(".*(?:youtu.be\\/|v\\/|u\\/\\w\\/|embed\\/|watch\\?v=)([^#\\&\\?]*).*", Pattern.CASE_INSENSITIVE);
    Matcher matcher = pattern.matcher(url);
    if (matcher.matches()) {
      String id = matcher.group(1);
      String iframeMarkup = "<iframe width='560' height='315' src='//www.youtube.com/embed/"
              + id + "' frameborder='0' allowfullscreen></iframe>";
      return iframeMarkup;
    } else {
      return "";
    }
  }

}
