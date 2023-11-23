package com.st1xee.music.api;

import com.st1xee.music.models.Album;
import com.st1xee.music.models.Image;
import com.st1xee.music.models.User;
import com.st1xee.music.repositories.ImageRepository;
import com.st1xee.music.services.AlbumService;
import com.st1xee.music.services.ImageService;
import com.st1xee.music.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
@RestController
@RequiredArgsConstructor
public class ImageAPIController {
    private final ImageRepository imageRepository;
    private final ImageService imageService;
    private final AlbumService albumService;
    private final UserService userService;

    @GetMapping("/image/{id}")
    private ResponseEntity<?> getImageById(@PathVariable Long id){
        Image image = imageRepository.findById(id).orElse(null);
        return ResponseEntity.ok()
                .header("fileName", image.getOriginalFileName())
                .contentType(MediaType.valueOf(image.getContentType()))
                .contentLength(image.getSize())
                .body(new InputStreamResource(new ByteArrayInputStream(image.getBytes())));
    }

    @PostMapping("/api/image/delete/album-image/{id}")
    private ResponseEntity<String> deleteAlbumImage(@PathVariable Long id){
        Album album = albumService.getAlbumById(id);

        Long imageId = album.getPreview().getId();

        album.setPreview(null);
        albumService.updateAlbum(album);

        imageService.deleteImage(imageId);
        return ResponseEntity.ok("Image was deleted");
    }

    @PostMapping("/api/image/delete/user-image/{id}")
    public ResponseEntity<String> deleteUserImage(@PathVariable Long id){
        User user = userService.getUserById(id);

        Long imageId = user.getImage().getId();

        user.setImage(null);
        userService.saveUser(user);

        imageService.deleteImage(imageId);
        return ResponseEntity.ok("Image was deleted");
    }
}

