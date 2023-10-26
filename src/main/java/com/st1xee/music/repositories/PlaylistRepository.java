package com.st1xee.music.repositories;

import com.st1xee.music.models.Playlist;
import com.st1xee.music.models.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @author sh1chiro 08.08.2023
 */
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    @Query("SELECT p FROM Playlist p WHERE :song IN elements(p.songs)")
    List<Playlist> findPlaylistsContainingSong(@Param("song") Song song);
}
