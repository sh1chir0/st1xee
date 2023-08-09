package com.st1xee.music.services;

import com.st1xee.music.models.Album;
import com.st1xee.music.repositories.AlbumRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * @author sh1chiro 08.08.2023
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class AlbumService {
    private final AlbumRepository albumRepository;
    public void createAlbum(Album album){
        albumRepository.save(album);
    }
    public Album getAlbumById(Long id){
        return albumRepository.findById(id).orElse(null);
    }
}
