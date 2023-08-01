package com.st1xee.music.models;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @author sh1chiro 29.07.2023
 */
@Entity
@Table(name = "albums")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "title")
    private String title;
    @ManyToOne
    private User artist;
    @OneToMany(mappedBy = "album")
    private List<Song> songs;
    @Column(name = "totalSongs")
    private int totalSongs;
    @Column(name = "totalDuration")
    private String totalDuration;
    @OneToOne
    private Image preview;
    @Column(name = "dateOfCreated")
    private LocalDateTime dateOfCreated;

    @PrePersist
    private void init(){
        dateOfCreated = LocalDateTime.now();
    }
}