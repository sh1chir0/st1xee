package com.st1xee.music.DTO;

import com.st1xee.music.enums.Roles;
import jakarta.persistence.Column;

import java.time.LocalDateTime;

public class UserDTO {
    private Long id;
    private String email;
    private String phoneNumber;
    private String nickname;
    private String password;
    private boolean active;
    private LocalDateTime dateOfCreated;
    private String role;
    private Long avatarId;
    private boolean artistOrder;
    public UserDTO(){}
    public UserDTO(Long id, String email, String phoneNumber, String nickname, String password, boolean active, LocalDateTime dateOfCreated, String role, Long avatarId, boolean artistOrder) {
        this.id = id;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.nickname = nickname;
        this.password = password;
        this.active = active;
        this.dateOfCreated = dateOfCreated;
        this.role = role;
        this.avatarId = avatarId;
        this.artistOrder = artistOrder;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public LocalDateTime getDateOfCreated() {
        return dateOfCreated;
    }

    public void setDateOfCreated(LocalDateTime dateOfCreated) {
        this.dateOfCreated = dateOfCreated;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getAvatarId() {
        return avatarId;
    }

    public void setAvatarId(Long avatarId) {
        this.avatarId = avatarId;
    }

    public boolean isArtistOrder() {
        return artistOrder;
    }

    public void setArtistOrder(boolean artistOrder) {
        this.artistOrder = artistOrder;
    }
}
