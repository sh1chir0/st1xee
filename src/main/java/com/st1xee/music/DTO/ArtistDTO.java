package com.st1xee.music.DTO;

import java.util.List;

public class ArtistDTO {
    private Long id;
    private String nickname;
    private Long previewId;
    private List<AlbumDTO> albums;

    public ArtistDTO(){}

    public ArtistDTO(Long id, String nickname, Long previewId, List<AlbumDTO> albums) {
        this.id = id;
        this.nickname = nickname;
        this.previewId = previewId;
        this.albums = albums;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public Long getPreviewId() {
        return previewId;
    }

    public void setPreviewId(Long previewId) {
        this.previewId = previewId;
    }

    public List<AlbumDTO> getAlbums() {
        return albums;
    }

    public void setAlbums(List<AlbumDTO> albums) {
        this.albums = albums;
    }
}
