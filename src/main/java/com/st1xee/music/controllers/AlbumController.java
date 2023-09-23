package com.st1xee.music.controllers;

import com.st1xee.music.models.Album;
import com.st1xee.music.services.AlbumService;
import com.st1xee.music.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

/**
 * @author sh1chiro 24.08.2023
 */

@Controller
@RequiredArgsConstructor
@PreAuthorize("hasAnyAuthority('CREATOR', 'ADMIN', 'ARTIST')")
public class AlbumController {
    private final AlbumService albumService;
    private final UserService userService;
    @GetMapping("/create-album")
    public String albumCr(Principal principal, Model model){
        model.addAttribute("user", userService.getUserByPrincipal(principal));
        return "createAlbum";
    }

    @PostMapping("/create-album")
    public String createAlbum(@RequestParam("title") String title, Principal principal){
        Album album = new Album();

        album.setTitle(title);
        album.setArtist(userService.getUserByPrincipal(principal));
        albumService.createAlbum(album);

        return ("redirect:/");
    }
    @GetMapping("/my-albums")
    public String myAlbums(Principal principal, Model model){
        model.addAttribute("albums", albumService.getAlbumsByArtist(userService.getUserByPrincipal(principal)));

        return "myAlbums";
    }
    @GetMapping("/my-albums/{id}")
    public String myAlbum(@PathVariable Long id, Model model){
        model.addAttribute("album", albumService.getAlbumById(id));
        return "myAlbum";
    }
    @PostMapping("/update-album-title/{id}")
    public String updateAlbumTitle(@PathVariable Long id, Album album){
        albumService.updateAlbum(album);
        return ("redirect:/my-albums/" + id);
    }
    @PostMapping("/update-album-preview/{id}")
    public String updateAlbumPreview(@PathVariable Long id, MultipartFile preview) throws IOException {
        albumService.updatePreview(id, preview);
        return ("redirect:/my-albums/" + id);
    }
}
