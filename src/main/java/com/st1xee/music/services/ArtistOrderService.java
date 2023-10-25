package com.st1xee.music.services;

import com.st1xee.music.models.ArtistOrder;
import com.st1xee.music.models.User;
import com.st1xee.music.repositories.ArtistOrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ArtistOrderService {
    private final ArtistOrderRepository artistOrderRepository;
    public void createOrder(ArtistOrder artistOrder){
        artistOrderRepository.save(artistOrder);
    }
    public ArtistOrder findArtistOrderByUser(User user){
        return artistOrderRepository.findArtistOrderByUser(user);
    }
}
