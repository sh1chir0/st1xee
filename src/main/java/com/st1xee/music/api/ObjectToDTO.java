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
        albumDTO.setSongsDTO(songListToSongDTOList(album.getSongs()));
        albumDTO.setTotalSongs(album.getTotalSongs());
        albumDTO.setTotalDuration(album.getTotalDuration());
        albumDTO.setPreviewId(album.getPreview().getId());
        return albumDTO;
    }


    public SongDTO songToSongDTO(Song song){
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
        return songDTO;
    }
    public UserDTO userToUserDTO(User user) {
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
            userDTO.setRole(userRoles.iterator().next().name().toLowerCase());
        } else {
            userDTO.setRole("");
        }
        userDTO.setAvatarId(user.getImage().getId());

        return userDTO;
    }
    public List<UserDTO> toUserDTOList(List<User> userList){
        List<UserDTO> userDTOList = new ArrayList<>();
        for (User user : userList) {
            userDTOList.add(userToUserDTO(user));
        }
        return userDTOList;
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
    public List<AlbumDTO> albumListToAlbumDTOList(List<Album> albums){
        List<AlbumDTO> albumDTOs = new ArrayList<>();
        for(Album album: albums){
            albumDTOs.add(albumToAlbumDTO(album));
        }
        return albumDTOs;
    }
    public List<SongDTO> songListToSongDTOList(List<Song> songs){
        List<SongDTO> songDTOs = new ArrayList<>();
        for(Song song: songs){
            songDTOs.add(songToSongDTO(song));
        }
        return songDTOs;
    }
    public List<ArtistDTO> artistListToArtistDTOList(List<User> artists){
        List<ArtistDTO> artistDTOs = new ArrayList<>();
        for(User artist: artists){
            artistDTOs.add(artistToArtistDTO(artist));
        }
        return artistDTOs;
    }
    public ObjectToDTO(){}
}
