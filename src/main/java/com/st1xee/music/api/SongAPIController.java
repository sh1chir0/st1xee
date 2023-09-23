package com.st1xee.music.api;

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

/**
 * @author sh1chiro 22.09.2023
 */

@RestController
@RequestMapping("/api/songs")
@RequiredArgsConstructor
//@CrossOrigin
public class SongAPIController {
    private final SongService songService;
    private final AlbumService albumService;
    private final UserService userService;
    private final PlaylistService playlistService;

    // Метод для відтворення пісні за її ідентифікатором
    @GetMapping("/{songId}/play")
    public ResponseEntity<ByteArrayResource> playSong(@PathVariable Long songId) {
        // Отримати пісню за ідентифікатором з сервісу
        Song song = songService.getSongById(songId);

        if (song == null) {
            return ResponseEntity.notFound().build();
        }

        // Підготовка відповіді для відтворення пісні
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


    @PostMapping("/add-song/{songId}")
    public ResponseEntity<String> addSongToPlaylist(@AuthenticationPrincipal User user, @PathVariable Long songId) {
        Playlist playlist = playlistService.findPlaylistById(user.getId());
        playlist.getSongs().add(songService.getSongById(songId));
        if(playlistService.save(playlist)){
            System.out.println("ok");
            return new ResponseEntity<>("Song added to playlist", HttpStatus.OK);
        }
        else{
            System.out.println("ne ok");
            return new ResponseEntity<>("Failed to add song to playlist", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/delete-song/{songId}")
    public void deleteSongFromPlaylist(@AuthenticationPrincipal User user, @PathVariable Long songId){
        Playlist playlist = playlistService.findPlaylistById(user.getId());
        playlist.getSongs().removeIf(song -> Objects.equals(song.getId(), songId));
        playlistService.save(playlist);
    }
}