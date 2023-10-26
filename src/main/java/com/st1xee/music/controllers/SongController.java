package com.st1xee.music.controllers;

import com.st1xee.music.models.Song;
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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * @author sh1chiro 22.09.2023
 */

@Controller
@RequiredArgsConstructor
@PreAuthorize("hasAnyAuthority('CREATOR', 'ADMIN', 'ARTIST')")
public class SongController {
    private final SongService songService;
    private final UserService userService;
    private final AlbumService albumService;
    private final ImageService imageService;

    @GetMapping("/upload")
    public String showUploadPage() {
        return "upload";
    }
    @PostMapping("/upload")
    public String uploadSong(@RequestParam("file") MultipartFile file,
                             @RequestParam("title") String title,
                             @RequestParam("artist") Long artist,
                             @RequestParam("album") Long album,
                             @RequestParam("preview") MultipartFile preview) {
//        try {
//            Song song = new Song();
//
//            byte[] audioData = file.getBytes();
//
//            if (preview != null) {
//                song.setPreview(imageService.add(preview));
//            }
//            song.setTitle(title);
//            song.setOriginalFileName(file.getOriginalFilename());
//            song.setFileType(file.getContentType());
//            song.setSize(file.getSize());
//            song.setArtist(userService.getUserById(artist));
//            song.setAlbum(albumService.getAlbumById(album));
//            song.setBytes(audioData);
//
//            File tempFile = File.createTempFile("temp_audio", ".mp3");
//            tempFile.deleteOnExit();
//            FileCopyUtils.copy(file.getInputStream(), new FileOutputStream(tempFile));
//
//            try {
//                AudioFile audioFile = AudioFileIO.read(tempFile);
//                if (audioFile != null && audioFile.getAudioHeader() != null) {
//                    int durationSeconds = audioFile.getAudioHeader().getTrackLength();
//                    int minutes = durationSeconds / 60;
//                    int seconds = durationSeconds % 60;
//                    String duration = String.format("%02d:%02d", minutes, seconds);
//                    song.setDuration(duration);
//                } else {
//                    song.setDuration("00:00");
//                }
//            } catch (CannotReadException | IOException | TagException | ReadOnlyFileException |
//                     InvalidAudioFrameException e) {
//                e.printStackTrace();
//                song.setDuration("00:00");
//            }
//
//            songService.saveSong(song);
//
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
        return "index";
    }
}
