package com.st1xee.music.controllers;

import com.st1xee.music.enums.Roles;
import com.st1xee.music.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import com.st1xee.music.services.UserService;

import java.security.Principal;

/**
 * @author sh1chiro 19.09.2023
 */

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminController {
    private final UserService userService;

    @GetMapping("/users")
    public String userList(Model model, Principal principal) {
        model.addAttribute("users", userService.allUsers());
        model.addAttribute("CREATOR", Roles.CREATOR);
        model.addAttribute("ADMIN", Roles.ADMIN);
        model.addAttribute("MODERATOR", Roles.MODERATOR);
        model.addAttribute("ARTIST", Roles.ARTIST);
        model.addAttribute("USER", Roles.USER);
        return "userList";
    }
    @PostMapping("/updateUserRole/{userId}")
    public String updateUserRole( @PathVariable Long userId, @RequestParam("role") Roles role) {
       userService.updateUserRole(userId, role);

        return ("redirect:/admin/users");
    }
}
