package com.st1xee.music.repositories;

import com.st1xee.music.models.ArtistOrder;
import com.st1xee.music.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistOrderRepository extends JpaRepository<ArtistOrder, Long> {
    ArtistOrder findArtistOrderByUser(User user);
}
