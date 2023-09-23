package com.st1xee.music.services;

import com.st1xee.music.enums.Roles;
import com.st1xee.music.models.Playlist;
import com.st1xee.music.models.User;
import com.st1xee.music.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
        if(user.isActive()){
            user.setActive(false);
            updateUser(user);
        }else{
            user.setActive(true);
            updateUser(user);
        }
    }
    public void updateUserRole(Long userId, Roles role){
        User user = getUserById(userId);
        user.getRoles().clear();
        user.getRoles().add(role);
        updateUser(user);
    }
    public boolean createUser(User user){
        if(userRepository.findByEmail(user.getEmail()) != null){
            return false;
        }
        user.setActive(true);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if(user.getEmail().equals("pavel.dereyes@gmail.com")){
            user.getRoles().add(Roles.ADMIN);
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
    public boolean updateUser(User user){
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
        updateUser(user);

    }
    public void updateAvatar(MultipartFile avatar, Principal principal) throws IOException{
        User user = getUserByPrincipal(principal);
        if(avatar != null){
            user.setImage(imageService.add(avatar));
        }
        updateUser(user);
    }
}
