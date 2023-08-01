package com.st1xee.music.enums;

import org.springframework.security.core.GrantedAuthority;

/**
 * @author sh1chiro 31.07.2023
 */
public enum Roles  implements GrantedAuthority {
    CREATOR,
    ADMIN,
    MODERATOR,
    ARTIST,
    USER;
    @Override
    public String getAuthority() {
        return name();
    }
}
