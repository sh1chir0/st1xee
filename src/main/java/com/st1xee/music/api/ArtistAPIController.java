package com.st1xee.music.api;

import com.st1xee.music.DTO.AlbumDTO;
import com.st1xee.music.DTO.ArtistDTO;
import com.st1xee.music.models.Album;
import com.st1xee.music.models.Song;
import com.st1xee.music.models.User;
import com.st1xee.music.services.AlbumService;
import com.st1xee.music.services.ImageService;
import com.st1xee.music.services.SongService;
import com.st1xee.music.services.UserService;
import lombok.RequiredArgsConstructor;
import org.jaudiotagger.audio.AudioFile;
import org.jaudiotagger.audio.AudioFileIO;
import org.jaudiotagger.audio.exceptions.CannotReadException;
import org.jaudiotagger.audio.exceptions.InvalidAudioFrameException;
import org.jaudiotagger.audio.exceptions.ReadOnlyFileException;
import org.jaudiotagger.tag.TagException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/artist")
@RequiredArgsConstructor
class ArtistAPIController {
    private final AlbumService albumService;
    private final SongService songService;
    private final ImageService imageService;
    private final UserService userService;
    private final ObjectToDTO objectToDTO = new ObjectToDTO();

    @GetMapping("/my-albums")
    public ResponseEntity<List<AlbumDTO>> getMyAlbums(@AuthenticationPrincipal User user) {
        List<Album> list = albumService.getAlbumsByArtist(user);
        List<AlbumDTO> listDTO = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            listDTO.add(objectToDTO.albumToAlbumDTO(list.get(i)));
        }
        return ResponseEntity.ok(listDTO);
    }

    @PreAuthorize("hasAnyAuthority('CREATOR', 'ADMIN', 'ARTIST')")
    @PostMapping("/update/album/{id}")
    public ResponseEntity<String> handleTitleUpdate(@RequestParam("albumTitle") String albumTitle, @PathVariable Long id) {
        if (!albumTitle.isEmpty()) {
            albumService.updateTitle(id, albumTitle);
            return ResponseEntity.ok("Title successfully updated");
        }
        return ResponseEntity.badRequest().body("Title is empty");
    }

    @PostMapping("/update/album/{id}/preview")
    public ResponseEntity<String> handleTitleUpload(@RequestParam("avatar") MultipartFile previewFile, @PathVariable Long id) throws IOException {
        if (previewFile != null) {
            albumService.updatePreview(id, previewFile);
            return ResponseEntity.ok("File uploaded successfully");
        } else {
            return ResponseEntity.badRequest().body("No file provided");
        }
    }

    @PostMapping("/update/song/{id}")
    public ResponseEntity<String> handleSongTitleUpdate(@RequestParam("songTitle") String songTitle, @PathVariable Long id) {
        if (!songTitle.isEmpty()) {
            songService.updateTitle(id, songTitle);
            return ResponseEntity.ok("Title successfully updated");
        }
        return ResponseEntity.badRequest().body("Title is empty");
    }

    @PostMapping("/delete/song/{id}")
    public ResponseEntity<String> handleDeleteSongUpdate(@PathVariable Long id) {
        songService.deleteSong(id);
        return ResponseEntity.ok("Title successfully updated");
    }

    @PostMapping("/load/song")
    public ResponseEntity<String> handleLoadSong(@RequestParam("songTitle") String songTitle,
                                                 @RequestParam("albumId") Long albumId,
                                                 @RequestParam("preview") MultipartFile previewFile,
                                                 @RequestParam("song") MultipartFile songFile,
                                                 @AuthenticationPrincipal User user){
        try {
            Song song = new Song();

            byte[] audioData = songFile.getBytes();

            if (previewFile != null) {
                song.setPreview(imageService.add(previewFile));
            }
            song.setTitle(songTitle);
            song.setOriginalFileName(songFile.getOriginalFilename());
            song.setFileType(songFile.getContentType());
            song.setSize(songFile.getSize());
            song.setArtist(user);
            song.setAlbum(albumService.getAlbumById(albumId));
            song.setBytes(audioData);

            File tempFile = File.createTempFile("temp_audio", ".mp3");
            tempFile.deleteOnExit();
            FileCopyUtils.copy(songFile.getInputStream(), new FileOutputStream(tempFile));

            try {
                AudioFile audioFile = AudioFileIO.read(tempFile);
                if (audioFile != null && audioFile.getAudioHeader() != null) {
                    int durationSeconds = audioFile.getAudioHeader().getTrackLength();
                    int minutes = durationSeconds / 60;
                    int seconds = durationSeconds % 60;
                    String duration = String.format("%02d:%02d", minutes, seconds);
                    song.setDuration(duration);
                } else {
                    song.setDuration("00:00");
                }
            } catch (CannotReadException | IOException | TagException | ReadOnlyFileException |
                     InvalidAudioFrameException e) {
                e.printStackTrace();
                song.setDuration("00:00");
            }

            songService.saveSong(song);
            return ResponseEntity.ok("Song successfully uploaded");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().body("Song dont uploaded");
    }

    @PostMapping("/create/album")
    public ResponseEntity<String> handleCreateAlbum(@RequestParam("albumTitle") String title,
                                                    @RequestParam("albumPreview") MultipartFile preview,
                                                    @AuthenticationPrincipal User user) throws IOException {
        Album album = new Album();
        album.setTitle(title);
        album.setArtist(user);
        album.setPreview(imageService.add(preview));
        albumService.createAlbum(album);
        return ResponseEntity.ok("Album was created");
    }

    @GetMapping("/get")
    public ResponseEntity<ArtistDTO> getArtist(@RequestParam("nickname") String nickname){
        User artist = userService.getUserByNickname(nickname);
        return ResponseEntity.ok(objectToDTO.artistToArtistDTO(artist));
    }
}

