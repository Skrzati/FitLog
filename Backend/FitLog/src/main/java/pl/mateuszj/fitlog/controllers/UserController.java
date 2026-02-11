package pl.mateuszj.fitlog.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.mateuszj.fitlog.models.User;
import pl.mateuszj.fitlog.services.UserService;


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
    @GetMapping("/User/username/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        return ResponseEntity.ok(userService.getusernameDto(username));
    }

    @GetMapping("/User/id/{id}")
    public ResponseEntity<?> getUserById(@PathVariable("id") long id) {
        return ResponseEntity.ok(userService.getFirstnameDto(id));
    }
}
