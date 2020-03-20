package com.example.polls;

import com.example.polls.service.EmailService;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;

class EmailServiceTest {
    // @Test // don't run this
    void sendEmail() throws IOException {
        int code = new EmailService().sendEmail(
                "hpb4530@gmail.com",
                "dipta670@gmail.com",
                "ACM SAC Test",
                "Hello world!"
        );

        assertEquals(code, 202);
    }
}
