package com.st1xee.music.services;

import com.st1xee.music.enums.Roles;
import com.st1xee.music.models.Playlist;
import com.st1xee.music.models.User;
import com.st1xee.music.repositories.UserRepository;
import com.sun.security.auth.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Set;

/**
 * @author sh1chiro 31.07.2023
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PlaylistService playlistService;
    private final PasswordEncoder passwordEncoder;
    private final ImageService imageService;

    public List<User> allUsers(){
        return userRepository.findAll();
    }
    public void ban(Long id){
        User user = getUserById(id);
        user.setActive(!user.isActive());
        saveUser(user);
    }
    public void updateUserRole(Long userId, Roles role){
        User user = getUserById(userId);
        user.getRoles().clear();
        user.getRoles().add(role);
        saveUser(user);
    }
    public boolean createUser(User user){
        if(userRepository.findByEmail(user.getEmail()) != null){
            return false;
        }
        user.setActive(true);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if(user.getEmail().equals("pavel.dereyes@gmail.com")){
            user.getRoles().add(Roles.CREATOR);
        }else{
            user.getRoles().add(Roles.USER);
        }

        userRepository.save(user);

        Playlist defaultPlaylist = new Playlist();
        defaultPlaylist.setTitle("default");
        defaultPlaylist.setArtist(user);
        user.getPlaylists().add(playlistService.createPlaylist(defaultPlaylist));

        userRepository.save(user);

        return true;
    }
    public User getUserByPrincipal(Principal principal){
        if(principal == null){
            return new User();
        }
        else{
            return userRepository.findByEmail(principal.getName());

        }
    }
    public User getUserById(Long id){
        return userRepository.findById(id).orElse(null);
    }
    public User getUserByPhoneNumber(String phoneNumber){
        return userRepository.getUserByPhoneNumber(phoneNumber);
    }
    public User getUserByNickname(String nickname){
        return userRepository.getUserByNickname(nickname);
    }
    public User getUserByEmail(String email){
        return userRepository.getUserByEmail(email);
    }
    public List<User> getAdmins(){
        Roles moderator = Roles.MODERATOR;
        Roles admin = Roles.ADMIN;
        Roles creator = Roles.CREATOR;
        return userRepository.findAdmins(moderator, admin, creator);
    }
    public List<User> getArtists(){
        Roles artist = Roles.ARTIST;
        return userRepository.findArtists(artist);
    }
    public List<User> getUsers(){
        Roles user = Roles.USER;
        return userRepository.findUsers(user);
    }

    public boolean saveUser(User user){
        if(user != null){
            userRepository.save(user);
            return true;
        }
        else
            return false;
    }
    public void updateUser(User updatedUser, Principal principal){
        User user = getUserByPrincipal(principal);
        if(getUserByEmail(updatedUser.getEmail()) == null || getUserByEmail(updatedUser.getEmail()) == user)
            user.setEmail(updatedUser.getEmail());
        if(getUserByPhoneNumber(updatedUser.getPhoneNumber()) == null || getUserByPhoneNumber(updatedUser.getPhoneNumber()) == user)
            user.setPhoneNumber(updatedUser.getPhoneNumber());
        if(getUserByNickname(updatedUser.getNickname()) == null || getUserByNickname(updatedUser.getNickname()) == user)
            user.setNickname(updatedUser.getNickname());
        saveUser(user);
    }
    public boolean updateNickname(Long id, String nickname) {
        if (getUserByNickname(nickname) == null){
            User user = getUserById(id);
            user.setNickname(nickname);
            saveUser(user);
            return true;
        }
        return false;
    }
    public boolean updateEmail(Long id, String email){
        if(getUserByEmail(email) == null){
            User user = getUserById(id);
            user.setEmail(email);
            saveUser(user);
            return true;
        }
        return false;
    }
    public boolean updatePhone(Long id, String phone) {
        if (getUserByPhoneNumber(phone) == null) {
            User user = getUserById(id);
            user.setPhoneNumber(phone);
            saveUser(user);
            return true;
        }
        return false;
    }

    public void updateAvatar(MultipartFile avatar, Principal principal) throws IOException{
        User user = getUserByPrincipal(principal);
        if(avatar != null){
            user.setImage(imageService.add(avatar));
        }
        saveUser(user);
    }
    public void updateAvatar(MultipartFile avatar, User user) throws IOException{
        if(avatar != null){
            user.setImage(imageService.add(avatar));
        }
        saveUser(user);
    }
    public void deleteAvatar(Long id){
        User user = getUserById(id);
        if(user != null){
            user.setImage(imageService.getImageById(1L));
            saveUser(user);
        }
    }


}
