package com.st1xee.music.enums;

import org.springframework.security.core.GrantedAuthority;

/**
 * @author sh1chiro 31.07.2023
 */
public enum Roles  implements GrantedAuthority {
    CREATOR(5),
    ADMIN(4),
    MODERATOR(3),
    ARTIST(2),
    USER(1);

    private final int roleNumber;
    Roles(int roleNumber) {
        this.roleNumber = roleNumber;
    }
    @Override
    public String getAuthority() {
        return name();
    }
    public int getRoleNumber() {
        return roleNumber;
    }
}
