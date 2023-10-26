package com.st1xee.music.api;

import com.st1xee.music.DTO.AlbumDTO;
import com.st1xee.music.DTO.ArtistDTO;
import com.st1xee.music.DTO.SongDTO;
import com.st1xee.music.DTO.UserDTO;
import com.st1xee.music.enums.Roles;
import com.st1xee.music.models.Album;
import com.st1xee.music.models.ArtistOrder;
import com.st1xee.music.models.Song;
import com.st1xee.music.models.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class ObjectToDTO {
    public AlbumDTO albumToAlbumDTO(Album album){
        AlbumDTO albumDTO = new AlbumDTO();
        albumDTO.setId(album.getId());
        albumDTO.setTitle(album.getTitle());
        albumDTO.setArtistNickname(album.getArtist().getNickname());
        albumDTO.setArtistId(album.getArtist().getId());
        albumDTO.setSongsDTO(songToSongDTO(album.getSongs()));
        albumDTO.setTotalSongs(album.getTotalSongs());
        albumDTO.setTotalDuration(album.getTotalDuration());
        albumDTO.setPreviewId(album.getPreview().getId());
        return albumDTO;
    }
    public List<SongDTO> songToSongDTO(List<Song> songs){
        List<SongDTO> songDTOs = new ArrayList<>();
        for(Song song: songs){
            SongDTO songDTO = new SongDTO();
            songDTO.setId(song.getId());
            songDTO.setTitle(song.getTitle());
            songDTO.setArtistId(song.getArtist().getId());
            songDTO.setArtistNickname(song.getArtist().getNickname());
            if(song.getAlbum() != null){
                songDTO.setAlbumId(song.getAlbum().getId());
                songDTO.setAlbumTitle(song.getAlbum().getTitle());
            }
            songDTO.setPreview(song.getPreview().getId());
            songDTO.setDuration(song.getDuration());
            songDTOs.add(songDTO);
        }
        return songDTOs;
    }
    public UserDTO userToUserDTO(User user, ArtistOrder artistOrder) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setNickname(user.getNickname());
        userDTO.setPassword(user.getPassword());
        userDTO.setActive(user.isActive());
        userDTO.setDateOfCreated(user.getDateOfCreated());
        Set<Roles> userRoles = user.getRoles();
        if (!userRoles.isEmpty()) {
            userDTO.setRole(userRoles.iterator().next().name());
        } else {
            userDTO.setRole("");
        }
        userDTO.setAvatarId(user.getImage().getId());
        if (artistOrder == null)
            userDTO.setArtistOrder(true);
        else
            userDTO.setArtistOrder(false);

        return userDTO;
    }
    public ArtistDTO artistToArtistDTO(User artist){
        ArtistDTO artistDTO = new ArtistDTO();
        artistDTO.setId(artist.getId());
        artistDTO.setNickname(artist.getNickname());
        artistDTO.setPreviewId(artist.getImage().getId());
        List<AlbumDTO> albums = new ArrayList<>();
        for (int i = 0; i < artist.getAlbums().size(); i++) {
            AlbumDTO albumDTO = albumToAlbumDTO(artist.getAlbums().get(i));
            albums.add(albumDTO);
        }
        artistDTO.setAlbums(albums);

        return artistDTO;
    }

    public ObjectToDTO(){}
}
