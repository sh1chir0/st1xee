package com.st1xee.music.services;

import com.st1xee.music.models.Song;
import com.st1xee.music.repositories.SongRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * @author sh1chiro 29.07.2023
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class SongService {
    private final SongRepository songRepository;
    public void saveSong(Song song){
        songRepository.save(song);
        log.info("Song saved: {}", song.getTitle());
    }
    public Song getSong(){
        return songRepository.findById(1L).orElse(null);
    }
}