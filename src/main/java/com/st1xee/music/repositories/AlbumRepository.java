package com.st1xee.music.repositories;

import com.st1xee.music.models.Album;
import com.st1xee.music.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author sh1chiro 08.08.2023
 */
public interface AlbumRepository extends JpaRepository<Album, Long> {
    List<Album> getAlbumsByArtist(User artist);
}
