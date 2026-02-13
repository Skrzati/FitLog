package pl.mateuszj.fitlog.models.dto.userDto;

public record LoginRequest(
        String username,
        String email,
        String password
) {
}
