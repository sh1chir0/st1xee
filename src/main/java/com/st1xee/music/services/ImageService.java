package com.st1xee.music.services;

import com.st1xee.music.models.Image;
import com.st1xee.music.repositories.ImageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 * @author sh1chiro 08.08.2023
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class ImageService {
    private final ImageRepository imageRepository;

    public Long add(MultipartFile file) throws IOException {
        Image image = toImageEntity(file);
        imageRepository.save(image);
        System.out.println(image.getId());
        return image.getId();
    }
    private Image toImageEntity(MultipartFile file) throws IOException {
        Image image = new Image();
        image.setName(file.getName());
        image.setOriginalFileName(file.getOriginalFilename());
        image.setContentType(file.getContentType());
        image.setSize(file.getSize());
        image.setBytes(file.getBytes());
        return image;
    }

    public Image getImageById(Long id){
        return imageRepository.findById(id).orElse(null);
    }

    public void remove(Long id){
        imageRepository.deleteById(id);
    }

}
