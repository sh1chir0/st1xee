package com.st1xee.music.repositories;

import com.st1xee.music.models.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @author sh1chiro 29.07.2023
 */
public interface SongRepository extends JpaRepository<Song, Long> {
    @Query(value = "SELECT * FROM songs ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Song findRandomSong();

    @Query("SELECT s FROM Song s WHERE LOWER(s.title) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Song> findByTitleContainingIgnoreCase(@Param("searchTerm") String searchTerm);
}
