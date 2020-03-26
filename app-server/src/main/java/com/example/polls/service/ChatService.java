package com.example.polls.service;

import com.example.polls.model.*;
import com.example.polls.repository.*;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ChatService {
    private final PresentationRepository presentationRepository;
    private final TrackRepository trackRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final ReplyRepository replyRepository;

    public ChatService(PresentationRepository presentationRepository,
                       TrackRepository trackRepository,
                       UserRepository userRepository,
                       CommentRepository commentRepository,
                       ReplyRepository replyRepository) {

        this.presentationRepository = presentationRepository;
        this.trackRepository = trackRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
        this.replyRepository = replyRepository;
    }

    public List<Comment> getPresentationComments(long presentationID) throws Exception {
        return getPresentationByID(presentationID).getComments();
    }

    public List<Comment> getTrackComments(long trackID) throws Exception {
        return getTrackByID(trackID).getComments();
    }

    public Comment addPresentationComment(long userId, long presentationID, Comment comment) throws Exception {
        Presentation presentation = getPresentationByID(presentationID);
        User user = getUserById(userId);

        if (user.isBlocked()) {
            throw new Exception("User is blocked from commenting and replying");
        }
        if (comment == null || comment.getContent() == null || comment.getContent().trim().isEmpty()) {
            throw new Exception("Blank comment");
        }

        comment.setUser(user);
        comment.setDate(new Date());
        presentation.getComments().add(comment);
        commentRepository.save(comment);
        presentationRepository.save(presentation);

        return comment;
    }

    public Comment addTrackComment(long userId, long trackID, Comment comment) throws Exception {
        Track track = getTrackByID(trackID);
        User user = getUserById(userId);

        if (user.isBlocked()) {
            throw new Exception("User is blocked from commenting and replying");
        }
        if (comment == null || comment.getContent() == null || comment.getContent().trim().isEmpty()) {
            throw new Exception("Blank comment");
        }

        comment.setUser(user);
        comment.setDate(new Date());
        track.getComments().add(comment);
        commentRepository.save(comment);
        trackRepository.save(track);

        return comment;
    }

    public Reply addReply(long userId, long commentId, Reply reply) throws Exception {
        Comment comment = getCommentById(commentId);
        User user = getUserById(userId);

        if (user.isBlocked()) {
            throw new Exception("User is blocked from commenting and replying");
        }
        if (reply == null || reply.getContent() == null || reply.getContent().trim().isEmpty()) {
            throw new Exception("Blank reply");
        }

        reply.setUser(user);
        reply.setDate(new Date());
        comment.getReplies().add(reply);
        replyRepository.save(reply);
        commentRepository.save(comment);

        return reply;
    }

    public Comment blockUnblockComment(long commentId, boolean block) throws Exception {
        Comment comment = getCommentById(commentId);
        comment.setBlocked(block);
        return commentRepository.save(comment);
    }

    public Reply blockUnblockReply(long replyId, boolean block) throws Exception {
        Reply reply = getReplyById(replyId);
        reply.setBlocked(block);
        return replyRepository.save(reply);
    }

    public User blockUnblockUser(long userId, boolean block) throws Exception {
        User user = getUserById(userId);
        user.setBlocked(block);
        return userRepository.save(user);
    }

    // get entities by ID

    public Presentation getPresentationByID(long presentationID) throws Exception {
        Presentation presentation = presentationRepository.findById(presentationID).orElse(null);
        if (presentation == null) {
            throw new Exception("Presentation not found for ID " + presentationID);
        }
        return presentation;
    }

    public Track getTrackByID(long trackID) throws Exception {
        Track track = trackRepository.findById(trackID).orElse(null);
        if (track == null) {
            throw new Exception("Track not found for ID " + trackID);
        }
        return track;
    }

    public Comment getCommentById(long commentId) throws Exception {
        Comment comment = commentRepository.findById(commentId).orElse(null);
        if (comment == null) {
            throw new Exception("Comment not found for ID " + commentId);
        }
        return comment;
    }

    public Reply getReplyById(long replyId) throws Exception {
        Reply reply = replyRepository.findById(replyId).orElse(null);
        if (reply == null) {
            throw new Exception("Reply not found for ID " + reply);
        }
        return reply;
    }

    public User getUserById(long userId) throws Exception {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new Exception("User not found for ID " + userId);
        }
        return user;
    }
}
