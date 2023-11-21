package com.st1xee.music.api;

import com.st1xee.music.DTO.AlbumDTO;
import com.st1xee.music.DTO.ArtistDTO;
import com.st1xee.music.DTO.SearchDTO;
import com.st1xee.music.DTO.SongDTO;
import com.st1xee.music.models.Album;
import com.st1xee.music.models.Song;
import com.st1xee.music.models.User;
import com.st1xee.music.services.AlbumService;
import com.st1xee.music.services.SongService;
import com.st1xee.music.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class SearchAPIController {
    private final SongService songService;
    private final AlbumService albumService;
    private final UserService userService;
    private final ObjectToDTO objectToDTO = new ObjectToDTO();

    @GetMapping("/")
    public ResponseEntity<SearchDTO> search(@RequestParam("searchTerm") String searchTerm){
        List<Song> songs = songService.search(searchTerm);

        List<Album> albums = albumService.search(searchTerm);

        List<User> artists = userService.search(searchTerm);

        SearchDTO searchDTO = new SearchDTO();
        searchDTO.setSongsDTO(objectToDTO.songListToSongDTOList(songs));
        searchDTO.setAlbumsDTO(objectToDTO.albumListToAlbumDTOList(albums));
        searchDTO.setArtistsDTO(objectToDTO.artistListToArtistDTOList(artists));

        return ResponseEntity.ok(searchDTO);
    }
}
