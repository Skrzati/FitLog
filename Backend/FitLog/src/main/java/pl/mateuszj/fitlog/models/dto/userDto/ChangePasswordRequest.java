package pl.mateuszj.fitlog.models.dto.userDto;

import jakarta.validation.constraints.Size;


public record ChangePasswordRequest(
        String oldPassword,
        @Size(min = 8, message = "Nowe hasło musi mieć co najmniej 8 znaków")
        String newPassword
){
}
