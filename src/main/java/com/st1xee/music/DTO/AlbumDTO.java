package com.st1xee.music.DTO;

import com.st1xee.music.models.Image;
import com.st1xee.music.models.Song;
import com.st1xee.music.models.User;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @author sh1chiro 24.08.2023
 */
public class AlbumDTO {
    private Long id;
    private String title;
    private String artistNickname;
    private Long artistId;
    private List<SongDTO> songsDTO;
    private int totalSongs;
    private String totalDuration;
    private Long previewId;
    public AlbumDTO(){
    }

    public AlbumDTO(Long id, String title, String artistNickname, Long artistId, List<SongDTO> songsDTO, int totalSongs, String totalDuration, Long previewId) {
        this.id = id;
        this.title = title;
        this.artistNickname = artistNickname;
        this.artistId = artistId;
        this.songsDTO = songsDTO;
        this.totalSongs = totalSongs;
        this.totalDuration = totalDuration;
        this.previewId = previewId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getArtistNickname() {
        return artistNickname;
    }

    public void setArtistNickname(String artistNickname) {
        this.artistNickname = artistNickname;
    }

    public Long getArtistId() {
        return artistId;
    }

    public void setArtistId(Long artistId) {
        this.artistId = artistId;
    }

    public List<SongDTO> getSongsDTO() {
        return songsDTO;
    }

    public void setSongsDTO(List<SongDTO> songsDTO) {
        this.songsDTO = songsDTO;
    }

    public int getTotalSongs() {
        return totalSongs;
    }

    public void setTotalSongs(int totalSongs) {
        this.totalSongs = totalSongs;
    }

    public String getTotalDuration() {
        return totalDuration;
    }

    public void setTotalDuration(String totalDuration) {
        this.totalDuration = totalDuration;
    }

    public Long getPreviewId() {
        return previewId;
    }

    public void setPreviewId(Long previewId) {
        this.previewId = previewId;
    }
}
