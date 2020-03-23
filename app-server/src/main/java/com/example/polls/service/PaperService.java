package com.example.polls.service;

import com.example.polls.model.Comment;
import com.example.polls.model.Paper;
import com.example.polls.model.Reply;
import com.example.polls.model.User;
import com.example.polls.repository.CommentRepository;
import com.example.polls.repository.PaperRepository;
import com.example.polls.repository.ReplyRepository;
import com.example.polls.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class PaperService {
    private final PaperRepository paperRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final ReplyRepository replyRepository;

    public PaperService(PaperRepository paperRepository, UserRepository userRepository, CommentRepository commentRepository, ReplyRepository replyRepository) {
        this.paperRepository = paperRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
        this.replyRepository = replyRepository;
    }

    public Paper getPaperById(long paperId) throws Exception {
        Paper paper = paperRepository.findById(paperId).orElse(null);
        if (paper == null) {
            throw new Exception("Paper not found for ID " + paperId);
        }
        return paper;
    }

    public Comment getCommentById(long commentId) throws Exception {
        Comment comment = commentRepository.findById(commentId).orElse(null);
        if (comment == null) {
            throw new Exception("Comment not found for ID " + commentId);
        }
        return comment;
    }

    public User getUserById(long userId) throws Exception {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new Exception("User not found for ID " + userId);
        }
        return user;
    }

    public Paper createPaper(Paper paper) {
        return paperRepository.save(paper);
    }

    public Paper addComment(long userId, long paperId, Comment comment) throws Exception {
        Paper paper = getPaperById(paperId);
        User user = getUserById(userId);

        if (comment == null || comment.getContent() == null || comment.getContent().trim().isEmpty()) {
            throw new Exception("Blank comment");
        }

        comment.setUser(user);
        comment.setDate(new Date());
        commentRepository.save(comment);

        paper.getComments().add(comment);
        return paperRepository.save(paper);
    }

    public Comment addReply(long userId, long commentId, Reply reply) throws Exception {
        Comment comment = getCommentById(commentId);
        User user = getUserById(userId);

        if (reply == null || reply.getContent() == null || reply.getContent().trim().isEmpty()) {
            throw new Exception("Blank reply");
        }

        reply.setUser(user);
        reply.setDate(new Date());
        replyRepository.save(reply);

        comment.getReplies().add(reply);
        return commentRepository.save(comment);
    }
}
