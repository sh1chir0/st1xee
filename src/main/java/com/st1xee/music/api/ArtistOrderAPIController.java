package com.st1xee.music.api;

import com.st1xee.music.DTO.UserDTO;
import com.st1xee.music.models.ArtistOrder;
import com.st1xee.music.models.User;
import com.st1xee.music.services.ArtistOrderService;
import com.st1xee.music.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/artist-order")
@RequiredArgsConstructor
public class ArtistOrderAPIController {
    private final UserService userService;
    private final ObjectToDTO objectToDTO = new ObjectToDTO();
    private final ArtistOrderService artistOrderService;

    @PreAuthorize("hasAnyAuthority('CREATOR', 'ADMIN', 'MODERATOR')")
    @GetMapping("/get-all")
    public ResponseEntity<List<UserDTO>> getArtistOrders(){
        List<ArtistOrder> orderList = artistOrderService.getAll();
        List<User> userList = new ArrayList<>();
        for (int i = 0; i < orderList.size(); i++) {
            userList.add(orderList.get(i).getUser());
        }
        return ResponseEntity.ok(objectToDTO.toUserDTOList(userList));
    }

    @PreAuthorize("hasAnyAuthority('CREATOR', 'ADMIN', 'MODERATOR')")
    @GetMapping("/delete/{id}")
    public ResponseEntity<String> deleteArtistOrder(@PathVariable Long id){
        artistOrderService.deleteOrder(userService.getUserById(id));
        return ResponseEntity.ok("Order was deleted");
    }
}
