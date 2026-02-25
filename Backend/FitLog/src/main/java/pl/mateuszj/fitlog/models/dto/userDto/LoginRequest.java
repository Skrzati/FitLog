package pl.mateuszj.fitlog.models.dto.userDto;

import lombok.Builder;

@Builder
public record LoginRequest(
        String username,
        String email,
        String password
) {
}
