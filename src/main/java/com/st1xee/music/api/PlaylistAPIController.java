package com.st1xee.music.api;

import com.st1xee.music.DTO.SongDTO;
import com.st1xee.music.models.Playlist;
import com.st1xee.music.models.Song;
import com.st1xee.music.models.User;
import com.st1xee.music.services.PlaylistService;
import com.st1xee.music.services.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/playlist")
@RequiredArgsConstructor
public class PlaylistAPIController {
    private final PlaylistService playlistService;
    private final SongService songService;
    private final ObjectToDTO objectToDTO = new ObjectToDTO();
    @GetMapping("/")
    @ResponseBody
    public ResponseEntity<List<SongDTO>> getPlaylist(@AuthenticationPrincipal User user){
        List<Song> playlist = playlistService.findPlaylistById(user.getId()).getSongs();
        return ResponseEntity.ok(objectToDTO.songListToSongDTOList(playlist));
    }

    @PostMapping("/add-song/{songId}")
    public ResponseEntity<String> addSongToPlaylist(@AuthenticationPrincipal User user, @PathVariable Long songId) {
        Playlist playlist = playlistService.findPlaylistById(user.getId());
        playlist.getSongs().add(songService.getSongById(songId));
        if(playlistService.save(playlist)){
            return new ResponseEntity<>("Song added to playlist", HttpStatus.OK);
        }
        else{
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
