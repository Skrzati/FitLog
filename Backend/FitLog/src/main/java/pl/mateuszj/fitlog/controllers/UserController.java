package pl.mateuszj.fitlog.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.mateuszj.fitlog.models.User;
import pl.mateuszj.fitlog.models.dto.UserResponse;
import pl.mateuszj.fitlog.services.UserService;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping
public class UserController {

    private final UserService userService;
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/Login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User loginAccept = userService.userData(user);
        if (loginAccept != null) {
            return ResponseEntity.ok(loginAccept);
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Błędny login lub hasło");
        }
    }
    @PostMapping("/Register")
    public ResponseEntity<?> register(@RequestBody User user) {
        User created = userService.addUser(user);
        if (created != null) {
            return new ResponseEntity<>(created, HttpStatus.CREATED);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
    @GetMapping("/User/{id}")
    public ResponseEntity<?> name(@PathVariable Long id) {
        UserResponse name = userService.getUserById(id);
        if (name != null) {
            System.out.println(name);
            return ResponseEntity.ok(name);
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Błędny login lub hasło");
        }
    }
}
