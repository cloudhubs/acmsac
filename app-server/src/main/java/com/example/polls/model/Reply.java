package com.example.polls.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@Entity
public class Reply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    Date date;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @NotNull
    @Lob
    String content;

    // if true, reply is blocked due to violation
    private boolean blocked = false;
}
