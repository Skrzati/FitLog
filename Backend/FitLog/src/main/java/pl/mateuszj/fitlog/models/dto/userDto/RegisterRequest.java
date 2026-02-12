package pl.mateuszj.fitlog.models.dto.userDto;

import javax.management.relation.Role;

public record RegisterRequest(
        String username,
        String password,
        String firstname,
        String lastname,
        String email
) {
}
