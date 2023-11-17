package com.st1xee.music.api;

import com.st1xee.music.DTO.SongDTO;
import com.st1xee.music.models.Playlist;
import com.st1xee.music.models.Song;
import com.st1xee.music.models.User;
import com.st1xee.music.services.AlbumService;
import com.st1xee.music.services.PlaylistService;
import com.st1xee.music.services.SongService;
import com.st1xee.music.services.UserService;
import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Objects;
import java.util.Random;

/**
 * @author sh1chiro 22.09.2023
 */

@RestController
@RequestMapping("/api/song")
@RequiredArgsConstructor
public class SongAPIController {
    private final SongService songService;
    private final ObjectToDTO objectToDTO = new ObjectToDTO();

    @GetMapping("/{songId}/play")
    public ResponseEntity<ByteArrayResource> playSong(@PathVariable Long songId) {
        Song song = songService.getSongById(songId);

        if (song == null) {
            return ResponseEntity.notFound().build();
        }

        ByteArrayResource resource = new ByteArrayResource(song.getBytes());

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + song.getOriginalFileName());
        headers.add(HttpHeaders.CONTENT_TYPE, song.getFileType());
        headers.setContentLength(song.getSize());

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(song.getSize())
                .contentType(MediaType.parseMediaType(song.getFileType()))
                .body(resource);
    }

    @GetMapping("/random")
    public ResponseEntity<SongDTO> random(){
        return ResponseEntity.ok(objectToDTO.songToSongDTO(songService.getRandomSong()));
    }
}