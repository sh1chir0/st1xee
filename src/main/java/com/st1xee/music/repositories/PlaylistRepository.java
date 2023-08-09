package com.st1xee.music.repositories;

import com.st1xee.music.models.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author sh1chiro 08.08.2023
 */
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
}
