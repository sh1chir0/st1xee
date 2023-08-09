package com.st1xee.music.DTO;

/**
 * @author sh1chiro 09.08.2023
 */
public class SongDTO {
    private Long id;
    private String title;
    private Long albumId;
    private String albumTitle;
    private Long artistId;
    private String artistNickname;
    private Long preview;
    private String duration;
    public SongDTO(){
    }

    public SongDTO(Long id, String title, Long albumId, String albumTitle, Long artistId, String artistNickname, Long preview, String duration) {
        this.id = id;
        this.title = title;
        this.albumId = albumId;
        this.albumTitle = albumTitle;
        this.artistId = artistId;
        this.artistNickname = artistNickname;
        this.preview = preview;
        this.duration = duration;
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

    public Long getAlbumId() {
        return albumId;
    }

    public void setAlbumId(Long albumId) {
        this.albumId = albumId;
    }

    public String getAlbumTitle() {
        return albumTitle;
    }

    public void setAlbumTitle(String albumTitle) {
        this.albumTitle = albumTitle;
    }

    public Long getArtistId() {
        return artistId;
    }

    public void setArtistId(Long artistId) {
        this.artistId = artistId;
    }

    public String getArtistNickname() {
        return artistNickname;
    }

    public void setArtistNickname(String artistNickname) {
        this.artistNickname = artistNickname;
    }

    public Long getPreview() {
        return preview;
    }

    public void setPreview(Long preview) {
        this.preview = preview;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }
}
