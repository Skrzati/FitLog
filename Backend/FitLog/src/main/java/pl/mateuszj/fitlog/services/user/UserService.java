package pl.mateuszj.fitlog.services.user;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.mateuszj.fitlog.models.user.Role;
import pl.mateuszj.fitlog.models.user.User;
import pl.mateuszj.fitlog.models.dto.userDto.FirstnameRequest;
import pl.mateuszj.fitlog.models.dto.userDto.RegisterRequest;
import pl.mateuszj.fitlog.models.dto.userDto.UsernameRequest;
import pl.mateuszj.fitlog.repository.UserRepository;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Użytkownik nie istnieje"));
    }
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Użytkownik nie istnieje"));
    }

    public User registration(RegisterRequest registerRequest) {
        if (userRepository.findByUsername(registerRequest.username()).isPresent()) {
            throw new RuntimeException("Użytkownik o podanej nazwie użytkownika już istnieje");
        }
        else if(userRepository.findByEmail(registerRequest.email()).isPresent()) {
            throw new RuntimeException("Użytkownik o podanym emailu użytkownika już istnieje");
        }
        else {
            User user = User.builder()
                    .username(registerRequest.username())
                    .firstName(registerRequest.firstname())
                    .lastName(registerRequest.lastname())
                    .email(registerRequest.email())
                    .role(Role.USER)
                    .password(passwordEncoder.encode(registerRequest.password()))
                    .build();

            return userRepository.save(user);
        }
    }
    public User login(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            User data = userRepository.findByEmail(user.getEmail()).get();
            if (passwordEncoder.matches(user.getPassword(), data.getPassword())) {
                return data;
            }
            else{
                throw new RuntimeException();
            }
        }
        else if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            User data = userRepository.findByUsername(user.getUsername()).get();
            if (passwordEncoder.matches(user.getPassword(), data.getPassword())) {
                return data;
            }
            else {
                throw new RuntimeException();
            }
        }
        else {
            throw new RuntimeException();
        }
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
    public UsernameRequest getusernameDto(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika"));
        return new UsernameRequest(
                user.getId(),
                user.getUsername()
        );
    }
    public FirstnameRequest getFirstnameDto(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika"));
        return new FirstnameRequest(
                user.getId(),
                user.getFirstName()
        );
    }

}
