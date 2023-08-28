package com.st1xee.music.services;

import com.st1xee.music.models.Album;
import com.st1xee.music.models.User;
import com.st1xee.music.repositories.AlbumRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 * @author sh1chiro 08.08.2023
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class AlbumService {
    private final AlbumRepository albumRepository;
    private final ImageService imageService;
    public void createAlbum(Album album){
        albumRepository.save(album);
    }
    public Album getAlbumById(Long id){
        return albumRepository.findById(id).orElse(null);
    }
    public List<Album> getAlbumsByArtist(User artist){
        return albumRepository.getAlbumsByArtist(artist);
    }
    public void updateAlbum(Album album){
        albumRepository.save(album);
    }
    public void updatePreview(Long id, MultipartFile file) throws IOException {
        Album album = getAlbumById(id);
        album.setPreview(imageService.add(file));
        updateAlbum(album);
    }
}
