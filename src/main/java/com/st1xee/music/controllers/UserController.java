package com.st1xee.music.controllers;

import com.st1xee.music.models.User;
import com.st1xee.music.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

/**
 * @author sh1chiro 09.08.2023
 */
@Controller
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    @GetMapping("/login")
    public String login(){
        return "login";
    }
    @GetMapping("/registration")
    public String registration(){
        return "registration";
    }
    @PostMapping("/registration")
    public String createUser(User user){
        if(userService.createUser(user)){
            return ("redirect:/login");
        }else{
            return ("redirect:/registration");
        }
    }
    @GetMapping("/user-page")
    public String settingsUser(Principal principal, Model model){
        model.addAttribute("user", userService.getUserByPrincipal(principal));
        return "userPage";
    }
    @PostMapping("/user/update")
    public String updateUser(User user, Principal principal) {
        userService.updateUser(user, principal);
        return ("redirect:/user-page");
    }
    @PostMapping("/user/update/avatar")
    public String updateUserAvatar(@RequestParam("avatar") MultipartFile avatar, Principal principal)throws IOException{
        userService.updateAvatar(avatar, principal);
        return ("redirect:/user-page");
    }
    @PostMapping("/user/update/password")
    public String updatePassword(@RequestParam("oldPassword") String oldPassword,
                                 @RequestParam("newPassword") String newPassword,
                                 Principal principal, Model model){
        User user = userService.getUserByPrincipal(principal);
        if(passwordEncoder.matches(oldPassword, user.getPassword())){
            user.setPassword(passwordEncoder.encode(newPassword));
            userService.saveUser(user);
            return ("redirect:/user-page");
        }
        else{
            model.addAttribute("user", user);
            model.addAttribute("message", "Невірний пароль");
            return "userPage";
        }
    }

}
