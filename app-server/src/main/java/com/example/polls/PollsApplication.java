package com.example.polls;

import com.example.polls.exception.AppException;
import com.example.polls.model.Role;
import com.example.polls.model.RoleName;
import com.example.polls.model.Track;
import com.example.polls.model.User;
import com.example.polls.repository.RoleRepository;
import com.example.polls.repository.TrackRepository;
import com.example.polls.repository.UserRepository;
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
import java.util.TimeZone;

@SpringBootApplication
@EntityScan(basePackageClasses = {
		PollsApplication.class,
		Jsr310JpaConverters.class
})
public class PollsApplication {

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

			@Autowired PasswordEncoder passwordEncoder;

			@Value("classpath:track_codes.xlsx")
			private Resource trackCodesResource;

			@Override
			public void run(String... args) throws Exception {
				// if the track codes have not been loaded, do it now
				if (trackRepository.count() == 0) {
					XSSFWorkbook workbook = new XSSFWorkbook(trackCodesResource.getInputStream());
					XSSFSheet worksheet = workbook.getSheetAt(0);
					for(int i=0; i<worksheet.getPhysicalNumberOfRows(); i++) {
						XSSFRow row = worksheet.getRow(i);
						Track track = new Track();
						track.setCode(row.getCell(0).toString());
						track.setName(row.getCell(1).toString());
						trackRepository.save(track);
					}
				}

				if (!userRepository.existsByEmail("cheese@cake.com")) {
					User admin = new User();
					admin.setUsername("admin");
					admin.setPassword(passwordEncoder.encode("doofusqueen"));
					admin.setEmail("cheese@cake.com");
					admin.setName("Vincent Bushong");
					Role userRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
									.orElseThrow(() -> new AppException("Admin Role not set."));

					admin.setRoles(Collections.singleton(userRole));

					userRepository.save(admin);
				}
			}
		};
	}
}
