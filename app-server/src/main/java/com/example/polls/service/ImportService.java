package com.example.polls.service;

import com.example.polls.exception.AppException;
import com.example.polls.exception.ImportException;
import com.example.polls.model.*;
import com.example.polls.repository.PresentationRepository;
import com.example.polls.repository.RoleRepository;
import com.example.polls.repository.TrackRepository;
import com.example.polls.repository.UserRepository;
import com.example.polls.security.PasswordGenerator;
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
import java.util.Collections;
import java.util.Optional;

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

  private final String DEFAULT_CHAIR_PW = "acmsacchair2020";
  private final String DEFAULT_REGISTRANT_PW = "acmsac2020";

  public void importUsers() {
    try {
      // create presentations and presenters from the Google form responses
      Resource presentationResource = resourceLoader.getResource("classpath:presentations_responses.xlsx");
      XSSFWorkbook presentationWorkbook = new XSSFWorkbook(presentationResource.getInputStream());
      XSSFSheet presentationSheet = presentationWorkbook.getSheetAt(0);

      for (int i = 1; i < presentationSheet.getPhysicalNumberOfRows(); i++) {
        XSSFRow row = presentationSheet.getRow(i);
        User presenter = createOrRetrievePresenterFromImportRow(row);
        createPresentationFromImportRow(row, presenter);
      }

      // create chairs and update tracks from the Google form responses
      Resource chairResponseResource = resourceLoader.getResource("classpath:chairs_responses.xlsx");
      XSSFWorkbook chairResponseWorkbook = new XSSFWorkbook(chairResponseResource.getInputStream());
      XSSFSheet chairResponseSheet = chairResponseWorkbook.getSheetAt(0);

      for (int i = 1; i < chairResponseSheet.getPhysicalNumberOfRows(); i++) {
        XSSFRow row = chairResponseSheet.getRow(i);
        User chair = createOrRetrieveChairFromImportRow(row);
        updateTrackFromImportRow(row, chair);
      }

      // create other chairs who didn't respond
      Resource chairResource = resourceLoader.getResource("classpath:chairs.xlsx");
      XSSFWorkbook chairWorkbook = new XSSFWorkbook(chairResource.getInputStream());
      XSSFSheet chairSheet = chairWorkbook.getSheetAt(0);

      for (int i = 1; i < chairSheet.getPhysicalNumberOfRows(); i++) {
        XSSFRow row = chairSheet.getRow(i);
        addNonRespondingChairFromImportRow(row);
      }

      // add authors to their associated presentations
      Resource authorResource = resourceLoader.getResource("classpath:authors.xlsx");
      XSSFWorkbook authorWorkbook = new XSSFWorkbook(authorResource.getInputStream());
      XSSFSheet authorSheet = authorWorkbook.getSheetAt(0);

      for (int i = 1; i < authorSheet.getPhysicalNumberOfRows(); i++) {
        XSSFRow row = authorSheet.getRow(i);
        addAuthorFromImportRow(row);
      }

      // add other registrants
      Resource registrantResource = resourceLoader.getResource("classpath:registrants.xlsx");
      XSSFWorkbook registrantWorkbook = new XSSFWorkbook(registrantResource.getInputStream());
      XSSFSheet registrantSheet = registrantWorkbook.getSheetAt(0);

      for (int i = 1; i < registrantSheet.getPhysicalNumberOfRows(); i++) {
        XSSFRow row = registrantSheet.getRow(i);
        addRegistrantFromImportRow(row);
      }

    } catch (IOException e) {
      throw new ImportException("Could not open one of the excel files!", e);
    }
  }

  /**
   * Creates a user from a row of the presentation form excel file, or retrieves them if they exist
   * @param row
   * @return Created or retrieved user
   */
  private User createOrRetrievePresenterFromImportRow(XSSFRow row) {
    String email = row.getCell(6).toString().trim();
    String fullName = row.getCell(5).toString().trim();
    String username = email;
    int paperId = (int) row.getCell(2).getNumericCellValue();
    String password = Integer.toString(paperId);
    String affiliation = row.getCell(7, Row.CREATE_NULL_AS_BLANK).toString();
    String country = row.getCell(8, Row.CREATE_NULL_AS_BLANK).toString();
    String orcid = row.getCell(19, Row.CREATE_NULL_AS_BLANK).toString();
    String linkedIn = row.getCell(20, Row.CREATE_NULL_AS_BLANK).toString();
    String googleScholar = row.getCell(21, Row.CREATE_NULL_AS_BLANK).toString();
    String bio = row.getCell(22, Row.CREATE_NULL_AS_BLANK).toString();
    String picUrl = row.getCell(23, Row.CREATE_NULL_AS_BLANK).toString();

    // if this presenter has already had an account made for them, just retrieve it
    if (userRepository.existsByEmail(email)) {
        return userRepository.findByEmail(email).get();
    }

    return createUser(fullName, username, email, password, affiliation, country,
            orcid, linkedIn, googleScholar, bio, picUrl);
  }

  /**
   * Creates a presentation from a row of the presentation form excel file, assigned to the given presenter
   * @param row
   * @return The created presentation
   */
  private Presentation createPresentationFromImportRow(XSSFRow row, User presenter) {
    Presentation presentation = new Presentation();
    presentation.setTitle(row.getCell(4, Row.CREATE_NULL_AS_BLANK).toString());
    presentation.setPaperId((int) row.getCell(2).getNumericCellValue());
    presentation.setAuthorsString(row.getCell(9, Row.CREATE_NULL_AS_BLANK).toString());
    presentation.setTrackCode(row.getCell(10, Row.CREATE_NULL_AS_BLANK).toString());
    presentation.setSessionCode(row.getCell(11, Row.CREATE_NULL_AS_BLANK).toString());
    presentation.setSessionChair(row.getCell(12, Row.CREATE_NULL_AS_BLANK).toString());
    presentation.setDate(row.getCell(13, Row.CREATE_NULL_AS_BLANK).getDateCellValue().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
    presentation.setPaperAbstract(row.getCell(14, Row.CREATE_NULL_AS_BLANK).toString());
    presentation.setPageNumbers(row.getCell(15, Row.CREATE_NULL_AS_BLANK).toString());
    presentation.setAcknowledgements(row.getCell(16, Row.CREATE_NULL_AS_BLANK).toString());
    presentation.setVideoEmbed(row.getCell(17, Row.CREATE_NULL_AS_BLANK).toString());
    presentation.setSlidesUrl(row.getCell(18, Row.CREATE_NULL_AS_BLANK).toString());

    presentation.setPresenter(presenter);

    if (presentationRepository.existsByPaperId(presentation.getPaperId())) {
      return presentationRepository.findByPaperId(presentation.getPaperId()).get();
    } else {
      try {
        return presentationRepository.save(presentation);
      } catch (Exception e) {
        throw new ImportException("Could not create presentation!", e);
      }
    }
  }

  /**
   * Creates a user from a row of the chair form excel file, or retrieves them if they exist
   * @param row
   * @return
   */
  private User createOrRetrieveChairFromImportRow(XSSFRow row) {
    String email = row.getCell(1, Row.CREATE_NULL_AS_BLANK).toString().trim();
    String nameAndAffiliation = row.getCell(6, Row.CREATE_NULL_AS_BLANK).toString();
    String fullName = nameAndAffiliation.split(",")[0];
    String username = email;
    String password = DEFAULT_CHAIR_PW;
    String affiliation = nameAndAffiliation.split(",")[1];
    String orcid = row.getCell(12, Row.CREATE_NULL_AS_BLANK).toString();
    String linkedIn = row.getCell(13, Row.CREATE_NULL_AS_BLANK).toString();
    String googleScholar = row.getCell(14, Row.CREATE_NULL_AS_BLANK).toString();
    String bio = row.getCell(15, Row.CREATE_NULL_AS_BLANK).toString();
    String picUrl = row.getCell(16, Row.CREATE_NULL_AS_BLANK).toString();

    User user = null;

    // if this chair has already had an account made for them, just retrieve it
    if (userRepository.existsByEmail(email)) {
      return userRepository.findByEmail(email).get();
    } else {
      return createUser(fullName, username, email, password, affiliation, "", orcid, linkedIn,
              googleScholar, bio, picUrl);
    }
  }

  /**
   * Updates a track with the given chair and info from  a row of the chair form excel file
   * @param row
   * @param chair
   */
  private void updateTrackFromImportRow(XSSFRow row, User chair) {
    String trackCode = row.getCell(3, Row.CREATE_NULL_AS_BLANK).toString().trim();
    boolean isCoChair = row.getCell(4, Row.CREATE_NULL_AS_BLANK).toString().contains("Co-chair");

    Track track = trackRepository.findByCode(trackCode);
    track.setTrackUrl(row.getCell(5, Row.CREATE_NULL_AS_BLANK).toString());
    track.setVideoEmbed(row.getCell(10, Row.CREATE_NULL_AS_BLANK).toString());
    track.setMessage(row.getCell(11, Row.CREATE_NULL_AS_BLANK).toString());

    if (isCoChair) {
      track.getCoChairs().add(chair);
    } else {
      track.setChair(chair);
    }

    try {
      trackRepository.save(track);
    } catch (Exception e) {
      throw new ImportException("Could not update track!", e);
    }
  }

  /**
   * Create chair if they didn't respond to the form
   * @param row
   * @return
   */
  private void addNonRespondingChairFromImportRow(XSSFRow row) {
    String email = row.getCell(0, Row.CREATE_NULL_AS_BLANK).toString().trim();
    String fullName = row.getCell(2, Row.CREATE_NULL_AS_BLANK).toString().trim();
    String username = email;
    String password = DEFAULT_CHAIR_PW;
    String trackCode = row.getCell(1, Row.CREATE_NULL_AS_BLANK).toString().trim();

    User user = null;

    // if this chair has already had an account made for them, just retrieve it
    if (userRepository.existsByEmail(email)) {
      user = userRepository.findByEmail(email).get();
    } else {
      user = createUser(fullName, username, email, password, "", "", "", "",
              "", "", "");
    }

    Track track = trackRepository.findByCode(trackCode);
    try {
      track.getCoChairs().add(user);
      trackRepository.save(track);
    } catch (Exception e) {
      throw new ImportException("Could not update track!", e);
    }
  }

  /**
   * Creates a user from a row of the author excel file, or retrieves them if they exist,
   * and assigns them to their given presentation
   * @param row
   * @return
   */
  private void addAuthorFromImportRow(XSSFRow row) {
    String status = row.getCell(6).toString();

    // skip authors of rejected papers
    if (!status.contains("Accept")) {
      return;
    }
    int paperId = (int) row.getCell(0).getNumericCellValue();

    String email = row.getCell(11, Row.CREATE_NULL_AS_BLANK).toString().trim();
    String fullName = row.getCell(8, Row.CREATE_NULL_AS_BLANK).toString().trim() + " " + row.getCell(9, Row.CREATE_NULL_AS_BLANK).toString().trim();
    String username = email;
    String password = Integer.toString(paperId);
    String affiliation = row.getCell(12, Row.CREATE_NULL_AS_BLANK).toString();
    String bio = row.getCell(15, Row.CREATE_NULL_AS_BLANK).toString();
    User user;

    // if this author has already had an account made for them, just retrieve it
    if (userRepository.existsByEmail(email)) {
      user = userRepository.findByEmail(email).get();
    } else {
      user = createUser(fullName, username, email, password, affiliation, "", "", "",
              "", bio, "");
    }

    Optional<Presentation> presentationOpt = presentationRepository.findByPaperId(paperId);
    if (presentationOpt.isPresent()) {
      Presentation pres = presentationOpt.get();
      pres.getAuthors().add(user);
      try {
        presentationRepository.save(pres);
      } catch (Exception e) {
        throw new ImportException("Could not update presentation!", e);
      }
    }
  }

  private void addRegistrantFromImportRow(XSSFRow row) {
    String email = row.getCell(1, Row.CREATE_NULL_AS_BLANK).toString().trim();
    String fullName = row.getCell(0, Row.CREATE_NULL_AS_BLANK).toString().trim();
    String username = email;
    String password = DEFAULT_REGISTRANT_PW;
    String affiliation = row.getCell(2, Row.CREATE_NULL_AS_BLANK).toString();
    String admissionItem = row.getCell(8, Row.CREATE_NULL_AS_BLANK).toString().trim();

    // if this registrant is an author/presenter, skip
    if (admissionItem.equals("Main Conference")) {
      // if this registrant has been created for any reason, skip
      if (userRepository.existsByEmail(email)) {
        userRepository.findByEmail(email).get();
      } else {
        createUser(fullName, username, email, password, affiliation, "", "", "",
                "", "", "");
      }
    }
  }

  private User createUser(String name, String username, String email, String password,
                          String affiliation, String country, String orcid, String linkedIn,
                          String googleScholar, String bio, String picUrl) {
    // Creating user's account
    User user = new User(name, username, email, password, affiliation, country, orcid, linkedIn,
            googleScholar, bio, picUrl);

    user.setPassword(passwordEncoder.encode(user.getPassword()));

    Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
            .orElseThrow(() -> new AppException("User Role not set."));

    user.setRoles(Collections.singleton(userRole));

    try {
      return userRepository.save(user);
    } catch (Exception e) {
      throw new ImportException("Could not create user! " + e.getMessage(), e);
    }
  }
}
