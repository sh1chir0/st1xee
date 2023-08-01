package com.st1xee.music.models;

import com.st1xee.music.enums.Roles;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.*;

/**
 * @author sh1chiro 31.07.2023
 */
@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User  implements UserDetails{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="email")
    private String email;
    @Column(name="phoneNumber")
    private String  phoneNumber;
    @Column(name="nickname")
    private String nickname;
    @Column(name="password")
    private String password;
    @Column(name="active")
    private boolean active;
    @Column(name="dateOfCreated")
    private LocalDateTime dateOfCreated;
    @ElementCollection(targetClass = Roles.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "user_role",
            joinColumns = @JoinColumn(name="user_id"))
    @Enumerated(EnumType.STRING)
    private Set<Roles> roles = new HashSet<>();
    @OneToOne
    private Image image;
    @OneToMany(mappedBy = "artist")
    private List<Playlist> playlists;
    @OneToMany(mappedBy = "artist")
    private List<Song> songs;
    @OneToMany(mappedBy = "artist")
    private List<Album> albums;

    @PrePersist
    private void init(){
        dateOfCreated = LocalDateTime.now();
    }

    //security
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return active;
    }


}
