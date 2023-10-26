package com.st1xee.music.services;

import com.st1xee.music.models.Playlist;
import com.st1xee.music.models.Song;
import com.st1xee.music.repositories.PlaylistRepository;
import com.st1xee.music.repositories.SongRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author sh1chiro 29.07.2023
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class SongService {
    private final SongRepository songRepository;
    private final PlaylistRepository playlistRepository;
    public void saveSong(Song song){
        songRepository.save(song);
        log.info("Song saved: {}", song.getTitle());
    }
    public Song getSong(){
        return songRepository.findById(1L).orElse(null);
    }
    public List<Song> allSongs(){
        return songRepository.findAll();
    }
    public List<Song> getSongsByAlbumId(Long id){
        return songRepository.getSongsByAlbumId(id);
    }
    public Song getSongById(Long id){
        return songRepository.findById(id).orElse(null);
    }
    public void updateTitle(Long id, String title){
        Song song = getSongById(id);
        song.setTitle(title);
        saveSong(song);
    }
    public void deleteSong(Long id){
        List<Playlist> playlistsWithSong = playlistRepository.findPlaylistsContainingSong(getSongById(id));

        for (Playlist playlist : playlistsWithSong) {
            playlist.getSongs().removeIf(song -> song.getId().equals(id));
            playlistRepository.save(playlist);
        }


        songRepository.deleteById(id);
    }
}
