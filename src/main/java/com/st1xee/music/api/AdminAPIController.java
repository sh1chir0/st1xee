package com.st1xee.music.api;

import com.st1xee.music.DTO.UserDTO;
import com.st1xee.music.models.User;
import com.st1xee.music.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminAPIController {
    private final UserService userService;
    private final ObjectToDTO objectToDTO = new ObjectToDTO();
    @GetMapping("/get")
    public ResponseEntity<List<UserDTO>> getAdmins(){
        return ResponseEntity.ok(objectToDTO.toUserDTOList(userService.getAdmins()));
    }
}
