package com.example.polls.service;

import com.example.polls.exception.AppException;
import com.example.polls.exception.ImportException;
import com.example.polls.model.*;
import com.example.polls.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Slf4j
public class ImportService {
  @Autowired
  private PresentationRepository presentationRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private TrackRepository trackRepository;

  @Autowired
  private SessionRepository sessionRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private ResourceLoader resourceLoader;

  private final String DEFAULT_ORGANIZER_PW = "acmsaccommittee2021";
  private final String DEFAULT_REGISTRANT_PW = "acmsacregistrant2021";
  private final String DEFAULT_SESSION_CHAIR_PW = "sacsessionchair2021";
  private final String DEFAULT_CHAIR_PW = "acmsac2021-";
  private final String PRESENTATION_RESOURCE_NAME = "classpath:2021_papers.xlsx";
  private final String USER_RESOURCE_NAME = "classpath:2021_users.xlsx";
  private final String TRACK_CHAIR_RESOURCE_NAME = "classpath:2021_track_chairs.xlsx";
  private final String SESSION_RESOURCE_NAME = "classpath:2021_sessions.xlsx";
  private final String ORGANIZERS_RESOURCE_NAME = "classpath:2021_organizers.xlsx";

  public void importUsers() {
    try {
      Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
              .orElseThrow(() -> new AppException("User Role not set."));
      Role trackRole = roleRepository.findByName(RoleName.ROLE_CHAIR)
              .orElseThrow(() -> new AppException("Track Chair Role not set."));

      /**
       * Create track chair users
       */
      log.info("Importing track chairs");
      Resource trackResource = resourceLoader.getResource(TRACK_CHAIR_RESOURCE_NAME);
      XSSFWorkbook trackWorkbook = new XSSFWorkbook(trackResource.getInputStream());
      XSSFSheet trackSheet = trackWorkbook.getSheetAt(0);
      Set<Role> trackRoles = new HashSet<>(Arrays.asList(userRole, trackRole));
      for (int i = 1; i < trackSheet.getPhysicalNumberOfRows(); i++) {
        XSSFRow row = trackSheet.getRow(i);
        User user = createTrackChairFromImportRow(row, trackRoles); // create user objects
      }
      log.info("Done importing track chairs");

      /**
       * Create author users
       */
      log.info("Importing authors");
      Resource userResource = resourceLoader.getResource(USER_RESOURCE_NAME);
      XSSFWorkbook userWorkbook = new XSSFWorkbook(userResource.getInputStream());
      XSSFSheet userSheet = userWorkbook.getSheetAt(0);
      for (int i = 1; i < userSheet.getPhysicalNumberOfRows(); i++) {
        XSSFRow row = userSheet.getRow(i);
        User user = createUserFromImportRow(row, Collections.singleton(userRole)); // create user objects
      }
      log.info("Done importing authors");

      /**
       * Create organizer users
       */
      log.info("Importing organizers");
      Resource organizerResource = resourceLoader.getResource(ORGANIZERS_RESOURCE_NAME);
      XSSFWorkbook organizerWorkbook = new XSSFWorkbook(organizerResource.getInputStream());
      XSSFSheet organizerSheet = organizerWorkbook.getSheetAt(0);
      for (int i = 1; i < organizerSheet.getPhysicalNumberOfRows(); i++) {
        XSSFRow row = organizerSheet.getRow(i);
        User user = createOrganizerFromImportRow(row, Collections.singleton(userRole));
      }
      log.info("Done importing organizers");

      /**
       * Create presentations
       */
      log.info("Importing presentations");
      Resource presentationResource = resourceLoader.getResource(PRESENTATION_RESOURCE_NAME);
      XSSFWorkbook presentationWorkbook = new XSSFWorkbook(presentationResource.getInputStream());
      XSSFSheet presentationSheet = presentationWorkbook.getSheetAt(0);
      for (int i = 1; i < presentationSheet.getPhysicalNumberOfRows(); i++) {
        XSSFRow row = presentationSheet.getRow(i);
        String paperId = row.getCell(1, Row.CREATE_NULL_AS_BLANK).toString().trim(); // make sure ID exists
        if (!paperId.equals("")) {
          createPresentationFromImportRow(row);
        }
      }
      log.info("Done importing presentations");

      /**
       * Create sessions
       */
      log.info("Importing sessions");
      Resource sessionResource = resourceLoader.getResource(SESSION_RESOURCE_NAME);
      XSSFWorkbook sessionWorkbook = new XSSFWorkbook(sessionResource.getInputStream());
      XSSFSheet sessionSheet = sessionWorkbook.getSheetAt(0);
      for (int i = 3; i < sessionSheet.getPhysicalNumberOfRows(); i++) {
        XSSFRow row = sessionSheet.getRow(i);
        createSessionFromImportRow(row, userRole);
      }
      log.info("Done importing sessions");

      /**
       * assign papers to sessions
       */
      log.info("Assigning sessions");
      XSSFSheet sessionPapersSheet = sessionWorkbook.getSheetAt(1);
      for (int i = 3; i < sessionPapersSheet.getPhysicalNumberOfRows(); i++) {
        XSSFRow row = sessionPapersSheet.getRow(i);
        assignPaperToSession(row, userRole);
      }
      log.info("Done assigning sessions");
    } catch (IOException e) {
      throw new ImportException("Could not open one of the excel files!", e);
    }
  }



  /**
   * Creates new user for track chair and adds them to the list of chairs for the track
   * @param row
   * @param trackRoles
   * @return
   */
  private User createTrackChairFromImportRow(XSSFRow row, Set<Role> trackRoles) {
    String email = row.getCell(1).toString().trim();
    String fullName = row.getCell(2).toString().trim() + " " + row.getCell(3).toString().trim();
    String trackCode = row.getCell(4, Row.CREATE_NULL_AS_BLANK).toString().trim();
    User chair;
    if (userRepository.existsByEmail(email)) {
      chair = userRepository.findByEmail(email).get();
    } else {
      String pw = DEFAULT_CHAIR_PW + trackCode.toLowerCase();
      chair = createUser(fullName, email, email, pw, "", "",
              "", "", "", "", "", true, trackRoles);
    }
    Optional<Track> track = trackRepository.findByCodeIgnoreCase(trackCode);
    if (track.isPresent()) {
      Track realTrack = track.get();
      if (!realTrack.getChairs().stream().anyMatch(c -> c.getId().equals(chair.getId()))) {
        realTrack.getChairs().add(chair);
        try {
          trackRepository.save(realTrack);
        } catch (Exception e) {
          throw new ImportException("Could not update track!", e);
        }
      }
    }
    return chair;
  }

  private User createOrganizerFromImportRow(XSSFRow row, Set<Role> userRoles) {
    String email = row.getCell(2).toString().trim();
    if (userRepository.existsByEmail(email)) {
      return userRepository.findByEmail(email).get();
    }
    String username = email;
    String password = DEFAULT_ORGANIZER_PW;
    String fullName = row.getCell(0).toString().trim() + " " + row.getCell(1).toString().trim();
    String affiliation = row.getCell(3, Row.CREATE_NULL_AS_BLANK).toString().trim();
    String country = row.getCell(4, Row.CREATE_NULL_AS_BLANK).toString().trim();
    String orcid = "";
    String linkedIn = "";
    String googleScholar = "";
    String bio = "";
    String picUrl = "";

    return createUser(fullName, username, email, password, affiliation, country,
            orcid, linkedIn, googleScholar, bio, picUrl, false, userRoles);
  }

    /**
     * Creates user from row of user import file, or retrieves them if they exist
     * @param row
     * @param userRoles
     * @return created/retrieved user
     */
  private User createUserFromImportRow(XSSFRow row, Set<Role> userRoles) {
    String email = row.getCell(2).toString().trim();
    if (userRepository.existsByEmail(email)) {
      return userRepository.findByEmail(email).get();
    }
    String username = email;
    String password = "";
    String fullName = row.getCell(0).toString().trim() + " " + row.getCell(1).toString().trim();
    String affiliation = row.getCell(3, Row.CREATE_NULL_AS_BLANK).toString().trim();
    String country = row.getCell(4, Row.CREATE_NULL_AS_BLANK).toString().trim();
    String orcid = "";
    String linkedIn = "";
    String googleScholar = "";
    String bio = "";
    String picUrl = "";

    return createUser(fullName, username, email, password, affiliation, country,
            orcid, linkedIn, googleScholar, bio, picUrl, false, userRoles);
  }

  /**
   * Creates a presentation from a row of the presentation form excel file, assigned to the given presenter
   * @param row
   * @return The created presentation
   */
  private Presentation createPresentationFromImportRow(XSSFRow row) {
    try {
      Presentation presentation = new Presentation();
      int paperId = (int) row.getCell(1).getNumericCellValue();
      if (presentationRepository.existsByPaperId(paperId)) {
        presentation = presentationRepository.findByPaperId(paperId).orElse(new Presentation());
      }
      // get author emails (11 possible authors)
      List<String> emails = new ArrayList<>();
      for (int i = 0; i < 11; i++) {
        int cellNum = 40 + i * 7; // first email is at col 40, then every 7 cols after that
        emails.add(row.getCell(cellNum, Row.CREATE_NULL_AS_BLANK).toString().trim());
      }
      List<User> authors = userRepository.findAllByEmailIn(emails);
      for (User author : authors) {
        if (!author.isHasPassword()) {
          author.setPassword(passwordEncoder.encode(Integer.toString(paperId)));
          author.setHasPassword(true);
        }
      }
      authors = userRepository.saveAll(authors);
      String presenterEmail = row.getCell(124, Row.CREATE_NULL_AS_BLANK).toString().trim();
      User presenter = userRepository.findByEmail(presenterEmail).orElse(null);
      if (presenter == null && authors.size() > 0) {
        presenter = authors.get(0);
      }
      presentation.setTitle(row.getCell(6, Row.CREATE_NULL_AS_BLANK).toString());
      presentation.setPaperId(paperId);
      String authorString = authors.size() == 0 ? "" : (authors.size() == 1 ? authors.get(0).getName() :
              (authors.stream().map(User::getName).reduce((a, b) -> a + ", " + b).get()));
      presentation.setAuthorsString(authorString);
      presentation.setTrackCode(row.getCell(8, Row.CREATE_NULL_AS_BLANK).toString());
      presentation.setDate(LocalDate.now()); // TODO: ???
      presentation.setPaperAbstract(row.getCell(33, Row.CREATE_NULL_AS_BLANK).toString());
      int pageStart = (int) row.getCell(2).getNumericCellValue();
      int pageEnd = pageStart + (int) row.getCell(3).getNumericCellValue() - 1;
      String pageNumbers = pageStart + "-" + pageEnd;
      presentation.setPageNumbers(pageNumbers);
      presentation.setAcknowledgements(""); // TODO: ???
      presentation.setVideoEmbed(""); // TODO: get video embeds/slides, somehow
      presentation.setSlidesUrl("");
      presentation.setPresenter(presenter);
      presentation.setType(row.getCell(30, Row.CREATE_NULL_AS_BLANK).toString());
      presentation.setAuthors(authors);
      return presentationRepository.save(presentation);
    } catch (Exception e) {
      e.printStackTrace();
      throw new ImportException("Could not create presentation! " + e.getMessage(), e);
    }
  }

  public Session createSessionFromImportRow(XSSFRow row, Role userRole) {
    String sessionCode = row.getCell(1, Row.CREATE_NULL_AS_BLANK).toString();
    String trackCode = row.getCell(8, Row.CREATE_NULL_AS_BLANK).toString();
    if (trackCode.trim().isEmpty()) {
      // TODO: handle keynotes etc.
      return null; // skip these for now; either empty row or a session we can't deal with right now
    }

    // chair stuff
    String chairInfo1 = row.getCell(11, Row.CREATE_NULL_AS_BLANK).toString();
    String chairInfo2 = row.getCell(13, Row.CREATE_NULL_AS_BLANK).toString();
    String chairEmail1 = row.getCell(12, Row.CREATE_NULL_AS_BLANK).toString();
    String chairEmail2 = row.getCell(14, Row.CREATE_NULL_AS_BLANK).toString();

    // create chair users if needed
    User chair1 = userRepository.findByEmail(chairEmail1).orElse(null);
    if (chair1 == null && !chairEmail1.trim().equals("")) {
      createUser(chairInfo1, chairEmail1, chairEmail1, DEFAULT_SESSION_CHAIR_PW, "",
              "", "", "", "", "", "", true, Collections.singleton(userRole));
    }

    User chair2 = userRepository.findByEmail(chairEmail2).orElse(null);
    if (chair2 == null && !chairEmail2.trim().equals("")) {
      createUser(chairInfo2, chairEmail2, chairEmail2, DEFAULT_SESSION_CHAIR_PW, "",
              "", "", "", "", "", "", true, Collections.singleton(userRole));
    }

    // meeting link
    String link = row.getCell(15, Row.CREATE_NULL_AS_BLANK).toString();

    // Session date/time stuff!
    String startString = row.getCell(5, Row.CREATE_NULL_AS_BLANK).toString();
    ZonedDateTime zonedStart = row.getCell(4).getDateCellValue().toInstant().atZone(ZoneId.of("Asia/Seoul"));
    String endString = row.getCell(7, Row.CREATE_NULL_AS_BLANK).toString();
    ZonedDateTime zonedEnd = row.getCell(6).getDateCellValue().toInstant().atZone(ZoneId.of("Asia/Seoul"));

    Instant start = getInstantFromDateAndTime(zonedStart, startString);
    Instant end = getInstantFromDateAndTime(zonedEnd, endString);

    // find session to edit or create a new one
    Session session = sessionRepository.findBySessionCode(sessionCode).orElse(null);
    session = session != null ? session : new Session();

    session.setSessionCode(sessionCode);
    session.setSessionName(row.getCell(2, Row.CREATE_NULL_AS_BLANK).toString());

    int roundNum = (int) row.getCell(3).getNumericCellValue();

    if (roundNum == 1) {
      session.setPrimaryStart(start);
      session.setPrimaryEnd(end);
      session.setPrimaryChair1(chairInfo1);
      session.setPrimaryChair2(chairInfo2);
      session.setPrimaryMeetingLink(link);
      if (!trackCode.toLowerCase().contains("key") && !trackCode.toLowerCase().equals("")) {
        // parse track code
        String[] trackCodes = trackCode.split("-");
        Set<Track> tracks = new HashSet<>();
        for (String code : trackCodes) {
          Track track = trackRepository.findByCodeIgnoreCase(code).orElse(null);
          if (track == null) {
            continue;
          }
          tracks.add(track);
        }
        session.setTracks(tracks);
      }
    } else {
      session.setSecondaryStart(start);
      session.setSecondaryEnd(end);
      session.setSecondaryChair1(chairInfo1);
      session.setSecondaryChair2(chairInfo2);
      session.setSecondaryMeetingLink(link);
      if (!trackCode.toLowerCase().contains("key") && !trackCode.toLowerCase().equals("")) {
        // parse track code
        String[] trackCodes = trackCode.split("-");
        Set<Track> tracks = new HashSet<>();
        for (String code : trackCodes) {
          Track track = trackRepository.findByCodeIgnoreCase(code).orElse(null);
          if (track == null) {
            continue;
          }
          tracks.add(track);
        }
        session.setTracks(tracks);
      }
    }
    return sessionRepository.save(session);
  }

  private Instant getInstantFromDateAndTime(ZonedDateTime zonedDate, String timeString) {
    // string should be in form "5:00am"
    timeString = timeString.replace("am", "AM").replace("pm","PM");
    LocalTime time = LocalTime.parse(timeString, DateTimeFormatter.ofPattern("h:mma"));
    zonedDate = zonedDate.withHour(time.getHour()).withMinute(time.getMinute());
    return zonedDate.toInstant();
  }

  public void assignPaperToSession(XSSFRow row, Role userRole) {
    try {
      String sessionCode = row.getCell(1, Row.CREATE_NULL_AS_BLANK).toString();
      if (sessionCode.trim().isEmpty()) {
        return;
      }
      Session session = sessionRepository.findBySessionCode(sessionCode).orElse(null);
      if (session == null) {
        return;
      }
      int roundNum = 0;
      roundNum = (int) row.getCell(3).getNumericCellValue();

      Presentation[] presArray = new Presentation[5];
      // loop through 5 papers
      for (int i = 0; i < 5; i++) {
        // paper ID starts at column 8, and happens every 4 columns for 5 papers
        String paperIdVal = row.getCell(9 + i*4, Row.CREATE_NULL_AS_BLANK).toString();
        if (paperIdVal.trim().equals("")) { // empty paper ID slot = no pres
          continue;
        }
        int paperId = (int) row.getCell(9 + i*4, Row.CREATE_NULL_AS_BLANK).getNumericCellValue();
        if (paperId == 0) { // bad paper ID
          continue;
        }
        if (Arrays.stream(presArray).anyMatch(p -> p != null && p.getPaperId() == paperId)) { // ignore dupes
          continue;
        }
        Presentation presentation = presentationRepository.findByPaperId(paperId).orElse(null);
        if (presentation == null) {
          continue; // TODO: handle this better
        }
        presentation.setSessionCode(sessionCode);
        String name = row.getCell(10 + i*4, Row.CREATE_NULL_AS_BLANK).toString();
        String affiliation = row.getCell(11 + i*4, Row.CREATE_NULL_AS_BLANK).toString();
        String email = row.getCell(12 + i*4, Row.CREATE_NULL_AS_BLANK).toString();
        User presenter = userRepository.findByEmail(email).orElse(null);
        if (presenter != null) {
          presentation.setPresenter(presenter);
        } else if (email != null && email.trim() != "") {
          presenter = createUser(name, email, email, Integer.toString(paperId), affiliation, "",
                  "", "", "", "", "", true, Collections.singleton(userRole));
          presentation.setPresenter(presenter);
        }
        if (roundNum == 1) {
          presentation.setPrimaryStart(session.getPrimaryStart());
          presentation.setPrimaryEnd(session.getPrimaryEnd());
        } else {
          presentation.setSecondaryStart(session.getSecondaryStart());
          presentation.setSecondaryEnd(session.getSecondaryEnd());
        }
        presentation = presentationRepository.save(presentation);
        presArray[i] = presentation;
      }
      Pattern pattern = Pattern.compile("P\\d-[A-Z]");
      Matcher matcher = pattern.matcher(sessionCode);
      boolean isPoster = matcher.find();
      boolean isKeynote = sessionCode.toLowerCase().contains("key");

      Duration sessionDuration = Duration.between(session.getPrimaryStart(), session.getPrimaryEnd());
      int sessionMinutes = Math.round(sessionDuration.abs().toMinutes());
      int numPres = presArray[4] == null ? 4 : 5; // haha hardcoded numbers go brr
      int minutesPerPres = sessionMinutes / numPres; // if 4 presentations, divide by 4; else 5
      if (isPoster) {
        minutesPerPres = 15;
      }
      if (isKeynote) {
        minutesPerPres = 60;
      }
      Instant primaryStart = session.getPrimaryStart();
      Instant secondaryStart = session.getSecondaryStart();
      Set<Presentation> presSet = new HashSet<>(); // holds updated presentations to be set as session children
      for (int i = 0; i < numPres; i++) {
        Presentation pres = presArray[i];
        if (pres == null) {
          continue;
        }
        pres.setPrimaryStart(primaryStart.plus(i*minutesPerPres, ChronoUnit.MINUTES));
        pres.setPrimaryEnd(pres.getPrimaryStart().plus(minutesPerPres, ChronoUnit.MINUTES));
        if (secondaryStart != null) {
          pres.setSecondaryStart(secondaryStart.plus(i*minutesPerPres, ChronoUnit.MINUTES));
          pres.setSecondaryEnd(pres.getSecondaryStart().plus(minutesPerPres, ChronoUnit.MINUTES));
        }
        pres.setSession(session);
//      pres = presentationRepository.save(pres);
        presSet.add(pres);
      }
      session.setPresentations(presSet);
      sessionRepository.save(session);
    } catch (Exception e) {
      // fml
      e.printStackTrace();
      throw new ImportException("Failed to populate session! " + e.getMessage(), e);
    }
  }

  /**
   * Create a new user from extracted info
   * @param name
   * @param username
   * @param email
   * @param password
   * @param affiliation
   * @param country
   * @param orcid
   * @param linkedIn
   * @param googleScholar
   * @param bio
   * @param picUrl
   * @param hasPassword
   * @return
   */
  private User createUser(String name, String username, String email, String password,
                          String affiliation, String country, String orcid, String linkedIn,
                          String googleScholar, String bio, String picUrl, boolean hasPassword, Set<Role> roles) {
    try {
      if (email != null) {
        email = email.toLowerCase();
      }

      // Creating user's account
      User user = new User(name, username, email, password, affiliation, country, orcid, linkedIn,
              googleScholar, bio, picUrl, hasPassword);

      user.setPassword(passwordEncoder.encode(user.getPassword()));

      user.setRoles(roles);
      return userRepository.save(user);
    } catch (Exception e) {
      throw new ImportException("Could not create user! " + e.getMessage(), e);
    }
  }
}
