package com.st1xee.music.models;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

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
    @Column(name = "originalFileName")
    private String originalFileName;
    @Column(name = "size")
    private Long size;
    @Column(name = "fileType")
    private String fileType;
    @ManyToOne(fetch = FetchType.LAZY)
    private Album album;
    @ManyToOne(fetch = FetchType.LAZY)
    private User artist;
    @Column(name = "bytes", columnDefinition = "MEDIUMBLOB")
    private byte[] bytes;
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private Image preview;
    @Column(name = "duration")
    private String duration;
    @Column(name = "dateOfCreated")
    private LocalDateTime dateOfCreated;
    @PrePersist
    private void init(){
        dateOfCreated = LocalDateTime.now();
    }
}