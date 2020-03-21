package com.example.polls.service;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@Slf4j
public class EmailService {
    // prepares Mail object and send email
    // returns status code of the request
    public int sendEmail(String from, String to, String subject, String content) throws IOException {
        Email emailFrom = new Email(from);
        Email emailTo = new Email(to);
        Content emailContent = new Content("text/plain", content);
        Mail mail = new Mail(emailFrom, subject, emailTo, emailContent);

        log.info("Sending support email to " + to);
        return send(mail).getStatusCode();
    }

    // sends email using SendGrid api
    private Response send(Mail mail) throws IOException {
        SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
        Request request = new Request();
        request.setMethod(Method.POST);
        request.setEndpoint("mail/send");
        request.setBody(mail.build());
        return sg.api(request);
    }
}
