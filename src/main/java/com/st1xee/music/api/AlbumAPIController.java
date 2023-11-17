package com.st1xee.music.api;

import com.st1xee.music.DTO.AlbumDTO;
import com.st1xee.music.DTO.SongDTO;
import com.st1xee.music.models.Album;
import com.st1xee.music.models.Playlist;
import com.st1xee.music.models.Song;
import com.st1xee.music.models.User;
import com.st1xee.music.services.PlaylistService;
import com.st1xee.music.services.SongService;
import com.st1xee.music.services.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * @author sh1chiro 09.08.2023
 */
@RestController
@RequestMapping("/api/album")
@RequiredArgsConstructor
public class AlbumAPIController {
    private final AlbumService albumService;
    private final ObjectToDTO objectToDTO = new ObjectToDTO();

    @GetMapping ("/shazam")
    @ResponseBody
    public ResponseEntity<AlbumDTO> getTopShazam(){
        Album album = albumService.getAlbumById(1L);
        return ResponseEntity.ok(objectToDTO.albumToAlbumDTO(album));
    }



    @GetMapping("/get/{id}")
    public ResponseEntity<AlbumDTO> getAlbum(@PathVariable Long id){
        return ResponseEntity.ok(objectToDTO.albumToAlbumDTO(albumService.getAlbumById(id)));
    }
    @PreAuthorize("hasAnyAuthority('CREATOR', 'ADMIN', 'ARTIST')")
    @PostMapping("/delete/{id}")
    public ResponseEntity<String> deleteAlbum(@PathVariable Long id){
        if(albumService.deleteAlbum(id))
            return ResponseEntity.ok("The album has been deleted");
        else
            return ResponseEntity.badRequest().body("An error occurred while deleting the album");
    }

}

