package com.st1xee.music.repositories;

import com.st1xee.music.models.Song;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author sh1chiro 29.07.2023
 */
public interface SongRepository extends JpaRepository<Song, Long> {
    public List<Song> getSongsByAlbumId(Long id);

}
