package com.st1xee.music.controllers;

import com.st1xee.music.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;


/**
 * @author sh1chiro 29.07.2023
 */
@Controller
@RequiredArgsConstructor
public class MainController {
    private final UserService userService;
    @GetMapping("/")
    public String index(){
        return "index";
    }

    @GetMapping("/playlist")
    public String playlist(Principal principal, Model model){
        model.addAttribute("playlist", userService.getUserByPrincipal(principal).getPlaylists().get(0).getSongs());
        return "myPlaylist";
    }
}
