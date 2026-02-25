package pl.mateuszj.fitlog.models.dto.userDto;

import lombok.Builder;

import javax.management.relation.Role;

@Builder
public record RegisterRequest(
        String username,
        String password,
        String firstname,
        String lastname,
        String email
) {
}
