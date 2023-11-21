package com.st1xee.music.DTO;

import java.util.List;

public class SearchDTO {
    private List<SongDTO> songsDTO;
    private List<AlbumDTO> albumsDTO;
    private List<ArtistDTO> artistsDTO;

    public SearchDTO() {}

    public SearchDTO(List<SongDTO> songsDTO, List<AlbumDTO> albumsDTO, List<ArtistDTO> artistsDTO) {
        this.songsDTO = songsDTO;
        this.albumsDTO = albumsDTO;
        this.artistsDTO = artistsDTO;
    }

    public List<SongDTO> getSongsDTO() {
        return songsDTO;
    }

    public void setSongsDTO(List<SongDTO> songsDTO) {
        this.songsDTO = songsDTO;
    }

    public List<AlbumDTO> getAlbumsDTO() {
        return albumsDTO;
    }

    public void setAlbumsDTO(List<AlbumDTO> albumsDTO) {
        this.albumsDTO = albumsDTO;
    }

    public List<ArtistDTO> getArtistsDTO() {
        return artistsDTO;
    }

    public void setArtistsDTO(List<ArtistDTO> artistsDTO) {
        this.artistsDTO = artistsDTO;
    }
}
