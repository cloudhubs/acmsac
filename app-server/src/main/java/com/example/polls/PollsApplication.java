package com.example.polls;

import com.example.polls.exception.AppException;
import com.example.polls.model.*;
import com.example.polls.repository.AcmInfoRepository;
import com.example.polls.repository.RoleRepository;
import com.example.polls.repository.TrackRepository;
import com.example.polls.repository.UserRepository;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.TimeZone;

@SpringBootApplication
@EntityScan(basePackageClasses = {
        PollsApplication.class,
        Jsr310JpaConverters.class
})
public class PollsApplication {

    @Value("${app.admin.username}")
    private String adminUsername;
    @Value("${app.admin.password}")
    private String adminPassword;
    @Value("${app.admin.email}")
    private String adminEmail;
    @Value("${app.admin.name}")
    private String adminName;

    @PostConstruct
    void init() {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
    }

    public static void main(String[] args) {
        SpringApplication.run(PollsApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner() {
        return new CommandLineRunner() {
            @Autowired
            private TrackRepository trackRepository;

            @Autowired
            private UserRepository userRepository;

            @Autowired
            private RoleRepository roleRepository;

            @Autowired
            private AcmInfoRepository acmInfoRepository;

            @Autowired
            PasswordEncoder passwordEncoder;

            @Value("classpath:2021_tracks.xlsx")
            private Resource trackCodesResource;

            @Value("classpath:acm_info.xlsx")
            private Resource acmResource;

            @Override
            public void run(String... args) throws Exception {

                // if the track codes have not been loaded, do it now
                if (trackRepository.count() == 0) {
                    XSSFWorkbook workbook = new XSSFWorkbook(trackCodesResource.getInputStream());
                    XSSFSheet worksheet = workbook.getSheetAt(0);
                    for (int i = 0; i < worksheet.getPhysicalNumberOfRows(); i++) {
                        XSSFRow row = worksheet.getRow(i);
                        Track track = new Track();
                        track.setCode(row.getCell(0).toString());
                        track.setName(row.getCell(1).toString());
                        trackRepository.save(track);
                    }
                }

                // TODO: Needed for 2021?
//                // if the DOI info hasn't been loaded, do it
//                if (acmInfoRepository.count() == 0) {
//                    XSSFWorkbook workbook = new XSSFWorkbook(acmResource.getInputStream());
//                    XSSFSheet worksheet = workbook.getSheetAt(0);
//                    for (int i = 1; i < worksheet.getPhysicalNumberOfRows(); i++) {
//                        XSSFRow row = worksheet.getRow(i);
//                        AcmInfo info = new AcmInfo();
//                        info.setPaperId((int) row.getCell(0).getNumericCellValue());
//                        info.setDoiUrl(row.getCell(1).toString());
//                        info.setAcmUrl(row.getCell(2).toString());
//                        acmInfoRepository.save(info);
//                    }
//                }

                // create admin account if not exists
                if (!userRepository.existsByEmail(adminEmail)) {
                    User admin = new User();
                    admin.setUsername(adminUsername);
                    admin.setPassword(passwordEncoder.encode(adminPassword));
                    admin.setEmail(adminEmail);
                    admin.setName(adminName);

                    Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
                            .orElseThrow(() -> new AppException("Admin Role not set."));
                    Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                            .orElseThrow(() -> new AppException("User Role not set."));

                    Set<Role> roles = new HashSet<>();
                    roles.add(adminRole);
                    roles.add(userRole);

                    admin.setRoles(roles);

                    userRepository.save(admin);
                }

            }
        };
    }
}
