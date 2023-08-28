package com.st1xee.music.api;

import com.st1xee.music.DTO.AlbumDTO;
import com.st1xee.music.DTO.SongDTO;
import com.st1xee.music.models.Album;
import com.st1xee.music.models.Song;
import com.st1xee.music.services.SongService;
import com.st1xee.music.services.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * @author sh1chiro 09.08.2023
 */
@RestController
@RequestMapping("/api/albums")
@RequiredArgsConstructor
public class AlbumAPIController {
    private final SongService songService;
    private final AlbumService albumService;
    @GetMapping("/songs")
    @ResponseBody
    public ResponseEntity<List<SongDTO>> getAllSongs(){
        List<Song> songs = songService.allSongs();
        return ResponseEntity.ok(songToSongDTO(songs));
    }
//    @GetMapping("/shazam")
//    @ResponseBody
//    public ResponseEntity<List<SongDTO>> getTopShazam(){
//        List<Song> songs = songService.getSongsByAlbumId(1L);
//        return ResponseEntity.ok(songToSongDTO(songs));
//    }
    @GetMapping ("/shazam")
    @ResponseBody
    public ResponseEntity<AlbumDTO> getTopShazam(){
        Album album = albumService.getAlbumById(1L);
        return ResponseEntity.ok(albumToAlbumDTO(album));
    }


    private AlbumDTO albumToAlbumDTO(Album album){
        AlbumDTO albumDTO = new AlbumDTO();
        albumDTO.setId(album.getId());
        albumDTO.setTitle(album.getTitle());
        albumDTO.setArtistNickname(album.getArtist().getNickname());
        albumDTO.setArtistId(album.getArtist().getId());
        albumDTO.setSongsDTO(songToSongDTO(album.getSongs()));
        albumDTO.setTotalSongs(album.getTotalSongs());
        albumDTO.setTotalDuration(album.getTotalDuration());
        albumDTO.setPreviewId(album.getPreview().getId());
        return albumDTO;
    }
    private List<SongDTO> songToSongDTO(List<Song> songs){
        List<SongDTO> songDTOs = new ArrayList<>();
        for(Song song: songs){
            SongDTO songDTO = new SongDTO();
            songDTO.setId(song.getId());
            songDTO.setTitle(song.getTitle());
            songDTO.setArtistId(song.getArtist().getId());
            songDTO.setArtistNickname(song.getArtist().getNickname());
            if(song.getAlbum() != null){
                songDTO.setAlbumId(song.getAlbum().getId());
                songDTO.setAlbumTitle(song.getAlbum().getTitle());
            }
            songDTO.setPreview(song.getPreview().getId());
            songDTO.setDuration(song.getDuration());
            songDTOs.add(songDTO);
        }
        return songDTOs;
    }

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
}

