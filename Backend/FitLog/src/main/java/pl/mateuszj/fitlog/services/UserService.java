package pl.mateuszj.fitlog.services;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.mateuszj.fitlog.models.User;
import pl.mateuszj.fitlog.repository.UserRepository;

import java.util.List;
import java.util.Optional;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User addUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("Użytkownik nie istnieje"));
    }
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Użytkownik nie istnieje"));
    }
    public User userData(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            User data = userRepository.findByEmail(user.getEmail()).get();
            if (passwordEncoder.matches(user.getPassword(), data.getPassword())) {
                System.out.println("Email");
                return data;
            }
        }
        else if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            User data = userRepository.findByUsername(user.getUsername()).get();
            if (passwordEncoder.matches(user.getPassword(), data.getPassword())) {
                System.out.println("Username");
                return data;
            }

        }


        return null;
    }





    public List<User> getAllStudent(User user) {
        return userRepository.findAll();
    }


}
