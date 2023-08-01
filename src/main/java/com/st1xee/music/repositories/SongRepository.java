package com.st1xee.music.repositories;

import com.st1xee.music.models.Song;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author sh1chiro 29.07.2023
 */
public interface SongRepository extends JpaRepository<Song, Long> {

}
