package com.st1xee.music.controllers;

import com.st1xee.music.enums.Roles;
import com.st1xee.music.models.User;
import com.st1xee.music.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.security.Principal;


/**
 * @author sh1chiro 29.07.2023
 */
@Controller
@RequiredArgsConstructor
public class MainController {
    private final UserService userService;
    @GetMapping("/")
    public String index(Model model){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUserByEmail(userDetails.getUsername());
        boolean adminPanel = false;
        boolean artistPanel = false;
        if(user != null){
            if(user.getRoles().contains(Roles.ADMIN) || user.getRoles().contains(Roles.MODERATOR)
                    || user.getRoles().contains(Roles.CREATOR)){
                adminPanel = true;
            }
            if(user.getRoles().contains(Roles.ADMIN) || user.getRoles().contains(Roles.ARTIST)
                    || user.getRoles().contains(Roles.CREATOR)){
                artistPanel = true;
            }
        }
        model.addAttribute("adminPanel", adminPanel);
        model.addAttribute("artistPanel", artistPanel);

        return "index";
    }


}
