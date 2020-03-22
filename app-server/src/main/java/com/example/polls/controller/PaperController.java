package com.example.polls.controller;

import com.example.polls.model.Comment;
import com.example.polls.model.Paper;
import com.example.polls.model.Reply;
import com.example.polls.security.CurrentUser;
import com.example.polls.security.UserPrincipal;
import com.example.polls.service.PaperService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/paper")
public class PaperController {
    private final PaperService paperService;

    public PaperController(PaperService paperService) {
        this.paperService = paperService;
    }

    @GetMapping("/{paperId}")
    @PreAuthorize("hasRole('USER')")
    public Paper getPaper(@PathVariable long paperId) throws Exception {
        return paperService.getPaperById(paperId);
    }

    @PostMapping
    // TODO: ADMIN only
    @PreAuthorize("hasRole('USER')")
    public Paper createPaper(@RequestBody Paper paper) {
        return paperService.createPaper(paper);
    }

    @PostMapping("/{paperId}/comment")
    @PreAuthorize("hasRole('USER')")
    public Paper addComment(@CurrentUser UserPrincipal currentUser, @PathVariable long paperId, @RequestBody Comment comment) throws Exception {
        return paperService.addComment(currentUser.getId(), paperId, comment);
    }

    @PostMapping("/{commentId}/reply")
    @PreAuthorize("hasRole('USER')")
    public Comment addReply(@CurrentUser UserPrincipal currentUser, @PathVariable long commentId, @RequestBody Reply reply) throws Exception {
        return paperService.addReply(currentUser.getId(), commentId, reply);
    }
}
