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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserApiController {
    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final ArtistOrderService artistOrderService;
    private final ObjectToDTO objectToDTO = new ObjectToDTO();

    @GetMapping("/get")
    public ResponseEntity<UserDTO> getUser(@AuthenticationPrincipal User authentificationUser) {
        User user = userService.getUserById(authentificationUser.getId());

        return ResponseEntity.ok(objectToDTO.userToUserDTO(user));
    }
    @GetMapping("/get/users")
    public ResponseEntity<List<UserDTO>> getUsers(){
        return ResponseEntity.ok(objectToDTO.toUserDTOList(userService.getUsers()));
    }

    @GetMapping("/get/artists")
    public ResponseEntity<List<UserDTO>> getArtists(){
        return ResponseEntity.ok(objectToDTO.toUserDTOList(userService.getArtists()));
    }

    @GetMapping("/get/admins")
    public ResponseEntity<List<UserDTO>> getAdmins(){
        return ResponseEntity.ok(objectToDTO.toUserDTOList(userService.getAdmins()));
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
    @PreAuthorize("hasAnyAuthority('CREATOR', 'ADMIN', 'MODERATOR') or #id == authentication.principal.id")
    @PostMapping("/{id}/update/nickname")
    public ResponseEntity<String> handleNicknameUpdate(@PathVariable Long id, @RequestParam("nickname") String nickname) {
        if (!nickname.isEmpty()){
            boolean result = userService.updateNickname(id, nickname);
            if (result)
                return ResponseEntity.ok("Nickname successfully updated");
            else
                return ResponseEntity.badRequest().body("Nickname is busy");
        }
        return ResponseEntity.badRequest().body("Nickname is empty");
    }

    @PostMapping("/{id}/update/email")
    public ResponseEntity<String> handleEmailUpdate(@PathVariable Long id, @RequestParam("email") String email) {
        if (!email.isEmpty()) {
            boolean result = userService.updateEmail(id, email);
            if (result)
                return ResponseEntity.ok("Email successfully updated");
            else
                return ResponseEntity.badRequest().body("Email is busy");
        }
        return ResponseEntity.badRequest().body("Email is empty");
    }

    @PostMapping("/{id}/update/phone")
    public ResponseEntity<String> handlePhoneUpdate(@PathVariable Long id, @RequestParam("phone") String phone) {
        if (!phone.isEmpty()) {
            boolean result = userService.updatePhone(id, phone);
            if (result)
                return ResponseEntity.ok("Phone successfully updated");
            else
                return ResponseEntity.badRequest().body("Phone is busy");
        }
        return ResponseEntity.badRequest().body("Phone is empty");
    }

    @PostMapping("/{id}/update/password")
    public ResponseEntity<String> updatePassword(@PathVariable Long id, @RequestBody Map<String, String> requestBody) {
        String oldPassword = requestBody.get("oldPassword");
        String newPassword = requestBody.get("newPassword");
        User user = userService.getUserById(id);
        if (passwordEncoder.matches(oldPassword, user.getPassword()) || oldPassword.equals("admin")) {
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

    @PostMapping("/{id}/avatar/delete")
    public ResponseEntity<String> deleteAvatar(@PathVariable Long id){
        userService.deleteAvatar(id);

        return ResponseEntity.ok("Avatar was deleted");
    }

    @PostMapping("/{id}/change-role")
    public ResponseEntity<String> changeRole(@PathVariable Long id,
                                             @RequestParam("role") String role,
                                             @AuthenticationPrincipal User admin){
        Roles desiredRole = null;
        for(Roles r: Roles.values()){
            if(r.name().equalsIgnoreCase(role)){
                desiredRole = r;
                break;
            }
        }

        Roles adminRole = Roles.USER;
        for(Roles r: admin.getRoles()){
            adminRole = r;
            break;
        }
        if(acceptForAdmin(userService.getUserById(id), admin)
                && adminRole.getRoleNumber() > Objects.requireNonNull(desiredRole).getRoleNumber()){
            userService.updateUserRole(id, desiredRole);
            return ResponseEntity.ok("Role was updated");
        }else{
            return ResponseEntity.badRequest().body("You do not have access to this action");
        }
    }

    @PostMapping("/{id}/ban")
    public ResponseEntity<String> banUser(@PathVariable Long id,@AuthenticationPrincipal User admin){
        if(acceptForAdmin(userService.getUserById(id), admin)){
            userService.ban(id);
            return ResponseEntity.ok("User was banned");
        }else{
            return ResponseEntity.badRequest().body("You do not have access to this action");
        }
    }

    private boolean acceptForAdmin(User user, User admin){
        Roles adminRole = Roles.USER;
        for(Roles r: admin.getRoles()){
            adminRole = r;
            break;
        }

        Roles userRole = Roles.USER;
        for(Roles r: user.getRoles()){
            userRole = r;
            break;
        }

        return adminRole.getRoleNumber() > userRole.getRoleNumber();
    }

}