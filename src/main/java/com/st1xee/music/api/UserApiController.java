package com.st1xee.music.api;

import com.st1xee.music.DTO.UserDTO;
import com.st1xee.music.enums.Roles;
import com.st1xee.music.models.ArtistOrder;
import com.st1xee.music.models.User;
import com.st1xee.music.services.ArtistOrderService;
import com.st1xee.music.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserApiController {
    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final ArtistOrderService artistOrderService;
    private final ObjectToDTO objectToDTO = new ObjectToDTO();

    @GetMapping("get")
    public ResponseEntity<UserDTO> getUser(@AuthenticationPrincipal User user) {
        ArtistOrder artistOrder = artistOrderService.findArtistOrderByUser(user);
        return ResponseEntity.ok(objectToDTO.userToUserDTO(user, artistOrder));
    }



    @PostMapping("/update/avatar")
    public ResponseEntity<String> handleAvatarUpload(@RequestParam("avatar") MultipartFile avatarFile, @AuthenticationPrincipal User user) throws IOException {
        if (avatarFile != null) {
            userService.updateAvatar(avatarFile, user);
            return ResponseEntity.ok("File uploaded successfully");
        } else {
            return ResponseEntity.badRequest().body("No file provided");
        }
    }

    @PostMapping("/update/nickname")
    public ResponseEntity<String> handleNicknameUpdate(@RequestParam("nickname") String nickname, @AuthenticationPrincipal User user) {
        if (!nickname.isEmpty()) {
            boolean result = userService.updateNickname(user, nickname);
            if (result)
                return ResponseEntity.ok("Nickname successfully updated");
            else
                return ResponseEntity.badRequest().body("Nickname is busy");
        }
        return ResponseEntity.badRequest().body("Nickname is empty");
    }

    @PostMapping("/update/email")
    public ResponseEntity<String> handleEmailUpdate(@RequestParam("email") String email, @AuthenticationPrincipal User user) {
        if (!email.isEmpty()) {
            boolean result = userService.updateEmail(user, email);
            if (result)
                return ResponseEntity.ok("Email successfully updated");
            else
                return ResponseEntity.badRequest().body("Email is busy");
        }
        return ResponseEntity.badRequest().body("Email is empty");
    }

    @PostMapping("/update/phone")
    public ResponseEntity<String> handlePhoneUpdate(@RequestParam("phone") String phone, @AuthenticationPrincipal User user) {
        if (!phone.isEmpty()) {
            boolean result = userService.updatePhone(user, phone);
            if (result)
                return ResponseEntity.ok("Phone successfully updated");
            else
                return ResponseEntity.badRequest().body("Phone is busy");
        }
        return ResponseEntity.badRequest().body("Phone is empty");
    }

    @PostMapping("/updatePassword")
    public ResponseEntity<String> updatePassword(@RequestBody Map<String, String> requestBody, @AuthenticationPrincipal User user) {
        String oldPassword = requestBody.get("oldPassword");
        String newPassword = requestBody.get("newPassword");

        if (passwordEncoder.matches(oldPassword, user.getPassword())) {
            String encodedPassword = passwordEncoder.encode(newPassword);

            user.setPassword(encodedPassword);

            userService.saveUser(user);

            return new ResponseEntity<>("Password updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Incorrect old password", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/get-status")
    public ResponseEntity<String> updatePassword(@AuthenticationPrincipal User user) {
        ArtistOrder artistOrder = new ArtistOrder();
        artistOrder.setUser(user);
        artistOrderService.createOrder(artistOrder);
        return new ResponseEntity<>("Password updated successfully", HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            request.getSession().invalidate();
        }
        return ResponseEntity.ok("The account has been logged out");
    }

}