package pl.mateuszj.fitlog.controllers;


import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.mateuszj.fitlog.models.User;
import pl.mateuszj.fitlog.models.dto.userDto.ChangePasswordRequest;
import pl.mateuszj.fitlog.models.dto.userDto.ChangeUsernameRequest;
import pl.mateuszj.fitlog.models.dto.userDto.RegisterRequest;
import pl.mateuszj.fitlog.services.UserService;


@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User loginAccept = userService.userData(user);
        if (loginAccept != null) {
            return ResponseEntity.ok(loginAccept);
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Błędny login lub hasło");
        }
    }
    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody RegisterRequest registerRequest) {
        userService.registration(registerRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @GetMapping("/username/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        return ResponseEntity.ok(userService.getusernameDto(username));
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> getUserById(@PathVariable long id) {
        return ResponseEntity.ok(userService.getFirstnameDto(id));
    }
    @PutMapping("/password/id/{id}")
    public ResponseEntity<?> updatePassword(@PathVariable long id,@Valid @RequestBody ChangePasswordRequest changePasswordRequest) {
        return ResponseEntity.ok(userService.changePassword(id, changePasswordRequest.oldPassword(),changePasswordRequest.newPassword()));
    }
    @PutMapping("/username/id/{id}")
    public ResponseEntity<?> updateUsername(@PathVariable long id, @RequestBody ChangeUsernameRequest changeUsernameRequest) {
        return ResponseEntity.ok(userService.changeUsername(id, changeUsernameRequest.newUsername()));
    }
}
