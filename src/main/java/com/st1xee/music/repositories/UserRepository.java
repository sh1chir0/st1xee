package com.st1xee.music.repositories;

import com.st1xee.music.enums.Roles;
import com.st1xee.music.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @author sh1chiro 31.07.2023
 */
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User getUserByPhoneNumber(String phoneNumber);
    User getUserByNickname(String nickname);
    User getUserByEmail(String email);

    @Query("SELECT u FROM User u WHERE :moderator MEMBER OF u.roles OR :admin MEMBER OF u.roles OR :creator MEMBER OF u.roles")
    List<User> findAdmins(@Param("moderator") Roles moderator, @Param("admin") Roles admin, @Param("creator") Roles creator);
    @Query("SELECT u FROM User u WHERE :artist MEMBER OF u.roles")
    List<User> findArtists(@Param("artist") Roles artist);
    @Query("SELECT u FROM User u WHERE :user MEMBER OF u.roles")
    List<User> findUsers(@Param("user") Roles user);
}
