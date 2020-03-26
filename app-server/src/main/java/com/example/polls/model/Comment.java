package com.example.polls.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    Date date;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    // don't use Set, order matters
    @OneToMany
    List<Reply> replies = new ArrayList<>();

    @NotNull
    @Lob
    String content;

    // if true, comment is blocked due to violation
    private boolean blocked = false;
}
