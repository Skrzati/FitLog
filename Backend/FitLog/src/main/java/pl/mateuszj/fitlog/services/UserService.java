package pl.mateuszj.fitlog.services;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.mateuszj.fitlog.models.Role;
import pl.mateuszj.fitlog.models.User;
import pl.mateuszj.fitlog.models.dto.userDto.ChangePasswordRequest;
import pl.mateuszj.fitlog.models.dto.userDto.Firstname;
import pl.mateuszj.fitlog.models.dto.userDto.Username;
import pl.mateuszj.fitlog.repository.UserRepository;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User addUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return null;
        } else if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return null;
        }
        user.setRole(Role.USER);
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
                return data;
            }
        }
        else if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            User data = userRepository.findByUsername(user.getUsername()).get();
            if (passwordEncoder.matches(user.getPassword(), data.getPassword())) {
                return data;
            }

        }
        return null;
    }
    public User changePassword(long id,String oldPassword, String newPassword ) {
        if (userRepository.findById(id).isPresent()) {
            User data = userRepository.findById(id).get();
            if(passwordEncoder.matches(oldPassword, data.getPassword())) {
                data.setPassword(passwordEncoder.encode(newPassword));
                return userRepository.save(data);
            }
            else {
                throw new RuntimeException("Niepoprawne hasło");
            }
        }
        else {
            throw new RuntimeException("Nie znaleziono użytkownika");
        }
    }
    public User changeUsername(Long id,String newUsername) {
        if (userRepository.findById(id).isPresent()) {
            User data = userRepository.findById(id).get();
            data.setUsername(newUsername);
            System.out.println(newUsername);
            return userRepository.save(data);
        }
        else {
            throw new RuntimeException("Nie znaleziono użytkownika");
        }
    }
    public Username getusernameDto(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika"));
        return new Username(
                user.getId(),
                user.getUsername()
        );
    }
    public Firstname getFirstnameDto(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika"));
        return new Firstname(
                user.getId(),
                user.getFirstName()
        );
    }

}
