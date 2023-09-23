package com.st1xee.music.services;

import com.st1xee.music.models.Playlist;
import com.st1xee.music.repositories.PlaylistRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * @author sh1chiro 08.08.2023
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class PlaylistService {
    private final PlaylistRepository playlistRepository;

    public Playlist createPlaylist(Playlist playlist){
        return playlistRepository.save(playlist);
    }
    public Boolean save(Playlist playlist){
        if(playlist != null){
            playlistRepository.save(playlist);
            return true;
        }
        else
            return false;
    }
    public Playlist findPlaylistById(Long id){
        return playlistRepository.findById(id).orElse(null);
    }
}
