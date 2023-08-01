package com.st1xee.music.models;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

/**
 * @author sh1chiro 29.07.2023
 */

@Entity
@Table(name = "songs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Song {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "title")
    private String title;

    @ManyToOne
    private Album album;
    @ManyToOne
    private User artist;
    @Column(name = "bytes")
    private byte[] bytes;
    @Column(name = "preview")
    private String preview;
    @Column(name = "duration")
    private String duration;
    @OneToOne
    private Playlist playlist;
    @Column(name = "dateOfCreated")
    private LocalDateTime dateOfCreated;
    @PrePersist
    private void init(){
        dateOfCreated = LocalDateTime.now();
    }
}