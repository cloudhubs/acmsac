package com.example.polls.controller;

import com.example.polls.model.Comment;
import com.example.polls.model.Reply;
import com.example.polls.model.User;
import com.example.polls.security.CurrentUser;
import com.example.polls.security.UserPrincipal;
import com.example.polls.service.ChatService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    // get all comments of a presentation
    // includes all associated replies
    @GetMapping("/presentation/{presentationID}")
    @PreAuthorize("hasRole('USER')")
    public List<Comment> getPresentationComments(@PathVariable long presentationID) throws Exception {
        return chatService.getPresentationComments(presentationID);
    }

    // get all comments of a track
    // includes all associated replies
    @GetMapping("/track/{trackID}")
    @PreAuthorize("hasRole('USER')")
    public List<Comment> getTrackComments(@PathVariable long trackID) throws Exception {
        return chatService.getTrackComments(trackID);
    }

    // post comment on a presentation
    @PostMapping("/presentation/{presentationID}")
    @PreAuthorize("hasRole('USER')")
    public Comment addPresentationComment(@CurrentUser UserPrincipal currentUser, @RequestBody Comment comment, @PathVariable long presentationID) throws Exception {
        return chatService.addPresentationComment(currentUser.getId(), presentationID, comment);
    }

    // post comment on a track
    @PostMapping("/track/{trackID}")
    @PreAuthorize("hasRole('USER')")
    public Comment addTrackComment(@CurrentUser UserPrincipal currentUser, @RequestBody Comment comment, @PathVariable long trackID) throws Exception {
        return chatService.addTrackComment(currentUser.getId(), trackID, comment);
    }

    // reply to a comment
    // same for both presentation comment and track comment
    @PostMapping("/reply/{commentID}")
    @PreAuthorize("hasRole('USER')")
    public Reply addReply(@CurrentUser UserPrincipal currentUser, @PathVariable long commentID, @RequestBody Reply reply) throws Exception {
        return chatService.addReply(currentUser.getId(), commentID, reply);
    }

    // block a comment
    // needs ADMIN permission
    // same for both presentation comment and track comment
    @PostMapping("/block/comment/{commentID}")
    @PreAuthorize("hasRole('ADMIN')")
    public Comment blockComment(@PathVariable long commentID) throws Exception {
        return chatService.blockUnblockComment(commentID, true);
    }

    // block a reply
    // needs ADMIN permission
    // same for replies of both presentation comment and track comment
    @PostMapping("/block/reply/{replyID}")
    @PreAuthorize("hasRole('ADMIN')")
    public Reply blockReply(@PathVariable long replyID) throws Exception {
        return chatService.blockUnblockReply(replyID, true);
    }

    // block a user from commenting and replying
    // needs ADMIN permission
    @PostMapping("/block/user/{userID}")
    @PreAuthorize("hasRole('ADMIN')")
    public User blockUser(@PathVariable long userID) throws Exception {
        return chatService.blockUnblockUser(userID, true);
    }

    @PostMapping("/unblock/comment/{commentID}")
    @PreAuthorize("hasRole('ADMIN')")
    public Comment unblockComment(@PathVariable long commentID) throws Exception {
        return chatService.blockUnblockComment(commentID, false);
    }

    @PostMapping("/unblock/reply/{replyID}")
    @PreAuthorize("hasRole('ADMIN')")
    public Reply unblockReply(@PathVariable long replyID) throws Exception {
        return chatService.blockUnblockReply(replyID, false);
    }

    @PostMapping("/unblock/user/{userID}")
    @PreAuthorize("hasRole('ADMIN')")
    public User unblockUser(@PathVariable long userID) throws Exception {
        return chatService.blockUnblockUser(userID, false);
    }
}
