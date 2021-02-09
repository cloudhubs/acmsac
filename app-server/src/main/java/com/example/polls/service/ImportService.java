package com.example.polls.service;

import com.example.polls.exception.AppException;
import com.example.polls.exception.ImportException;
import com.example.polls.model.*;
import com.example.polls.repository.PresentationRepository;
import com.example.polls.repository.RoleRepository;
import com.example.polls.repository.TrackRepository;
import com.example.polls.repository.UserRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

@Service
public class ImportService {
  @Autowired
  private PresentationRepository presentationRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private TrackRepository trackRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private ResourceLoader resourceLoader;

  private final String DEFAULT_ORGANIZER_PW = "acmsaccommittee2021";
  private final String DEFAULT_REGISTRANT_PW = "acmsacregistrant2021";
  private final String DEFAULT_CHAIR_PW = "acmsac2021-";
  private final String PRESENTATION_RESOURCE_NAME = "classpath:2021_papers.xlsx";
  private final String USER_RESOURCE_NAME = "classpath:2021_users.xlsx";
  private final String TRACK_CHAIR_RESOURCE_NAME = "classpath:2021_track_chairs.xlsx";
  private final String SESSION_RESOURCE_NAME = "classpath:2021_sessions.xlsx";

  public void importUsers() {
    try {
      Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
              .orElseThrow(() -> new AppException("User Role not set."));
      Role trackRole = roleRepository.findByName(RoleName.ROLE_CHAIR)
              .orElseThrow(() -> new AppException("Track Chair Role not set."));

      /**
       * Create track chair users
       */

      Resource trackResource = resourceLoader.getResource(TRACK_CHAIR_RESOURCE_NAME);
      XSSFWorkbook trackWorkbook = new XSSFWorkbook(trackResource.getInputStream());
      XSSFSheet trackSheet = trackWorkbook.getSheetAt(0);
      Set<Role> trackRoles = new HashSet<>(Arrays.asList(userRole, trackRole));
      for (int i = 1; i < trackSheet.getPhysicalNumberOfRows(); i++) {
        XSSFRow row = trackSheet.getRow(i);
        User user = createTrackChairFromImportRow(row, trackRoles); // create user objects
      }

      /**
       * Create author users
       */

      Resource userResource = resourceLoader.getResource(USER_RESOURCE_NAME);
      XSSFWorkbook userWorkbook = new XSSFWorkbook(userResource.getInputStream());
      XSSFSheet userSheet = userWorkbook.getSheetAt(0);

      for (int i = 1; i < userSheet.getPhysicalNumberOfRows(); i++) {
        XSSFRow row = userSheet.getRow(i);
        User user = createUserFromImportRow(row, Collections.singleton(userRole)); // create user objects
      }

      /**
       * Create presentations
       */

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

      /**
       * Create track chair users
       */

      Resource sessionResource = resourceLoader.getResource(SESSION_RESOURCE_NAME);
      XSSFWorkbook sessionWorkbook = new XSSFWorkbook(sessionResource.getInputStream());
      XSSFSheet sessionSheet = sessionWorkbook.getSheetAt(0);

      for (int i = 1; i < sessionSheet.getPhysicalNumberOfRows(); i++) {
        XSSFRow row = sessionSheet.getRow(i);
        createSessionFromImportRow(row);
      }

      // TODO: do we need these users?
//      // create chairs and update tracks from the Google form responses
//      Resource chairResponseResource = resourceLoader.getResource("classpath:chairs_responses.xlsx");
//      XSSFWorkbook chairResponseWorkbook = new XSSFWorkbook(chairResponseResource.getInputStream());
//      XSSFSheet chairResponseSheet = chairResponseWorkbook.getSheetAt(0);
//
//      for (int i = 1; i < chairResponseSheet.getPhysicalNumberOfRows(); i++) {
//        XSSFRow row = chairResponseSheet.getRow(i);
//        User chair = createOrRetrieveChairFromImportRow(row);
//        updateTrackFromImportRow(row, chair);
//      }
//
//      // create other chairs who didn't respond
//      Resource chairResource = resourceLoader.getResource("classpath:chairs.xlsx");
//      XSSFWorkbook chairWorkbook = new XSSFWorkbook(chairResource.getInputStream());
//      XSSFSheet chairSheet = chairWorkbook.getSheetAt(0);
//
//      for (int i = 1; i < chairSheet.getPhysicalNumberOfRows(); i++) {
//        XSSFRow row = chairSheet.getRow(i);
//        addNonRespondingChairFromImportRow(row);
//      }
//
//      // add authors to their associated presentations
//      Resource authorResource = resourceLoader.getResource("classpath:authors.xlsx");
//      XSSFWorkbook authorWorkbook = new XSSFWorkbook(authorResource.getInputStream());
//      XSSFSheet authorSheet = authorWorkbook.getSheetAt(0);
//
//      for (int i = 1; i < authorSheet.getPhysicalNumberOfRows(); i++) {
//        XSSFRow row = authorSheet.getRow(i);
//        addAuthorFromImportRow(row);
//      }
//
//      // add organizers
//      Resource organizerResource = resourceLoader.getResource("classpath:organizers.xlsx");
//      XSSFWorkbook organizerWorkbook = new XSSFWorkbook(organizerResource.getInputStream());
//      XSSFSheet organizerSheet = organizerWorkbook.getSheetAt(0);
//
//      for (int i = 1; i < organizerSheet.getPhysicalNumberOfRows(); i++) {
//        XSSFRow row = organizerSheet.getRow(i);
//        addOrganizerFromImportRow(row);
//      }
//
//      // add other registrants
//      Resource registrantResource = resourceLoader.getResource("classpath:registrants.xlsx");
//      XSSFWorkbook registrantWorkbook = new XSSFWorkbook(registrantResource.getInputStream());
//      XSSFSheet registrantSheet = registrantWorkbook.getSheetAt(0);
//
//      for (int i = 1; i < registrantSheet.getPhysicalNumberOfRows(); i++) {
//        XSSFRow row = registrantSheet.getRow(i);
//        addRegistrantFromImportRow(row);
//      }

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
      if (!realTrack.getChairs().contains(chair)) {
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
        presentation = presentationRepository.findByPaperId(paperId).get();
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
      if (presenter == null) {
        presenter = authors.get(0);
      }
      presentation.setTitle(row.getCell(6, Row.CREATE_NULL_AS_BLANK).toString());
      presentation.setPaperId(paperId);
      presentation.setAuthorsString(authors.stream().map(User::getName).reduce((a, b) -> a + ", " + b).get());
      presentation.setTrackCode(row.getCell(8, Row.CREATE_NULL_AS_BLANK).toString());
      presentation.setSessionCode(""); // TODO: ???
      presentation.setSessionChair(""); // TODO: ???
//      presentation.setDate(row.getCell(13, Row.CREATE_NULL_AS_BLANK).getDateCellValue().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
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

  private void createSessionFromImportRow(XSSFRow row) {
    String sessionId = row.getCell(0, Row.CREATE_NULL_AS_BLANK).toString();
    // TODO: make the session

    // loop through papers
    boolean morePapers = true;
    int orderNum = 1;
    do {
      int paperId = (int) row.getCell(1, Row.CREATE_NULL_AS_BLANK).getNumericCellValue();
      if (paperId != 0) { // TODO: DOES THIS WORK? Probs not
        Presentation pres = presentationRepository.findByPaperId(paperId).orElse(null);
        if (pres != null) {
          // TODO: add this presentation to the session
        }
        orderNum++;
      } else {
        morePapers = false;
      }
    } while(morePapers);
  }

  // TODO: where are these users?
//  private void addOrganizerFromImportRow(XSSFRow row) {
//    String email = row.getCell(0).toString().trim();
//    String name = row.getCell(1).toString().trim();
//    String affiliation = row.getCell(2, Row.CREATE_NULL_AS_BLANK).toString();
//    String password = DEFAULT_ORGANIZER_PW;
//    if (!userRepository.existsByEmail(email)) {
//      createUser(name, email, email, password, affiliation, "", "", "",
//              "", "", "");
//    }
//  }
//
//  private void addRegistrantFromImportRow(XSSFRow row) {
//    String email = row.getCell(1, Row.CREATE_NULL_AS_BLANK).toString().trim();
//    String fullName = row.getCell(0, Row.CREATE_NULL_AS_BLANK).toString().trim();
//    String username = email;
//    String password = DEFAULT_REGISTRANT_PW;
//    String affiliation = row.getCell(2, Row.CREATE_NULL_AS_BLANK).toString();
//    String admissionItem = row.getCell(8, Row.CREATE_NULL_AS_BLANK).toString().trim();
//
//    // if this registrant is an author/presenter, skip
//    if (admissionItem.equals("Main Conference")) {
//      // if this registrant has been created for any reason, skip
//      if (userRepository.existsByEmail(email)) {
//        userRepository.findByEmail(email).get();
//      } else {
//        createUser(fullName, username, email, password, affiliation, "", "", "",
//                "", "", "");
//      }
//    }
//  }

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
