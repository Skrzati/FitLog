package pl.mateuszj.fitlog.services;


import org.springframework.stereotype.Service;
import pl.mateuszj.fitlog.models.User;
import pl.mateuszj.fitlog.repository.UserRepository;

import java.util.List;


@Service
public class UserService {

    private final UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public User addUser(User user) {
        return userRepository.save(user);
    }
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("Użytkownik nie istnieje"));
    }
    
    
    
    
    
    
    public List<User> getAllStudent(User user) {
        return userRepository.findAll();
    }


}
