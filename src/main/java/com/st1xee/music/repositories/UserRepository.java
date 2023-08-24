package com.st1xee.music.repositories;

import com.st1xee.music.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author sh1chiro 31.07.2023
 */
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User getUserByPhoneNumber(String phoneNumber);
    User getUserByNickname(String nickname);
    User getUserByEmail(String email);
}
