package com.st1xee.music.controllers;

import com.st1xee.music.models.Song;
import com.st1xee.music.services.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

/**
 * @author sh1chiro 29.07.2023
 */
@Controller
@RequiredArgsConstructor
public class MainController {
    private final SongService songService;
    @GetMapping("/")
    public String index(){
        return "index";
    }
    @GetMapping("/login")
    public String login(){
        return "login";
    }



//    @GetMapping("/upload")
//    public String showUploadPage() {
//        return "upload"; // Відображення сторінки upload.html
//    }
//    @PostMapping("/upload")
//    public String uploadSong(@RequestParam("file") MultipartFile file,
//                                             @RequestParam("title") String title,
//                                             @RequestParam("artist") String artist) {
//        try {
//            String fileName = file.getOriginalFilename();
//            long fileSize = file.getSize();
//            String fileType = file.getContentType();
//
//
//            byte[] audioData = file.getBytes();
//
//            Song song = new Song();
//            song.setTitle(title);
//            song.setArtist(artist);
//            song.setDurationInSeconds(123);
//            song.setAudio(audioData);
//            songService.saveSong(song);
//
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        return "index";
//    }
}
