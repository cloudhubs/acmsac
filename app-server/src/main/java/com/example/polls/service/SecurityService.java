package com.example.polls.service;

import com.example.polls.model.Presentation;
import com.example.polls.model.Track;
import com.example.polls.repository.TrackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class SecurityService {
  @Autowired
  TrackRepository trackRepository;

  /**
   * Presentations are viewable if made public or user is an author, admin, or appropriate track chair
   * @param pres
   * @return
   */
  public boolean PresIsViewable(Presentation pres) {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    return (pres.isReleased() ||
            userIsAuthor(pres, auth) ||
            userIsAdmin(auth) ||
            userIsCorrectTrackChair(pres, auth)
    );
  }

  /**
   * Presentations are editable if user is an author, admin, or appropriate track chair
   * @param pres
   * @return
   */
  public boolean PresIsEditable(Presentation pres) {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    return (userIsAuthor(pres, auth) ||
            userIsAdmin(auth) ||
            userIsCorrectTrackChair(pres, auth)
    );
  }

  private boolean userIsAuthor(Presentation pres, Authentication auth) {
    String userEmail = getUserEmailFromAuth(auth);
    return pres.getAuthors().stream().anyMatch(u -> u.getEmail().equals(userEmail));
  }

  private boolean userIsCorrectTrackChair(Presentation pres, Authentication auth) {
    boolean isChair = auth != null && auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_CHAIR"));
    if (isChair) {
      Track presTrack = trackRepository.findByCodeIgnoreCase(pres.getTrackCode()).orElse(null);
      if (presTrack != null) {
        String userEmail = getUserEmailFromAuth(auth);
        return presTrack.getChairs().stream().anyMatch(u -> u.getEmail().equals(userEmail));
      }
    }
    return false;
  }

  private boolean userIsAdmin(Authentication auth) {
    return auth != null && auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
  }

  private String getUserEmailFromAuth(Authentication auth) {
    // assumes username is email, which is always is except for admin
    return auth != null ? ((UserDetails)auth.getPrincipal()).getUsername() : "";
  }
}
