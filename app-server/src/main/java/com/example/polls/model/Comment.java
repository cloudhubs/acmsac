package com.example.polls.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
    @JsonIdentityInfo(
            generator = ObjectIdGenerators.PropertyGenerator.class,
            property = "id",
            scope = User.class)
    @JsonIdentityReference(alwaysAsId = true)
    User user;

    // don't use Set, order matters
    @OneToMany
    List<Reply> replies = new ArrayList<>();

    @NotNull
    String content;
}
