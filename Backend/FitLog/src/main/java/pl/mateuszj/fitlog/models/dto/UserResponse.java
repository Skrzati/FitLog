package pl.mateuszj.fitlog.models.dto;

import pl.mateuszj.fitlog.models.User;

public record UserResponse(
        long id,
        String firstName,
        String username
) {
}