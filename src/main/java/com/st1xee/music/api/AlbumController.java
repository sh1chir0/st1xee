package com.st1xee.music.api;

import com.st1xee.music.DTO.SongDTO;
import com.st1xee.music.models.Song;
import com.st1xee.music.services.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * @author sh1chiro 09.08.2023
 */
@RestController
@RequestMapping("/api/albums")
@RequiredArgsConstructor
public class AlbumController {
    private final SongService songService;
    @GetMapping("/songs")
    @ResponseBody
    public ResponseEntity<List<SongDTO>> getAllSongs(){
        List<Song> songs = songService.allSongs();
        List<SongDTO> songDTOs = new ArrayList<>();
        for(Song song: songs){
            SongDTO songDTO = new SongDTO();
            songDTO.setId(song.getId());
            songDTO.setTitle(song.getTitle());
            songDTO.setArtistId(song.getArtist().getId());
            songDTO.setArtistNickname(song.getArtist().getEmail());
//            songDTO.setAlbumId(song.getAlbum().getId());
//            songDTO.setAlbumTitle(song.getAlbum().getTitle());
            songDTO.setPreview(song.getPreview().getId());
            songDTO.setDuration(song.getDuration());
            songDTOs.add(songDTO);
        }
        return ResponseEntity.ok(songDTOs);
    }
}

