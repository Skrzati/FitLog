package pl.mateuszj.fitlog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.mateuszj.fitlog.models.user.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String Email);
    Optional<User> findByUsername(String Username);
    Optional<User> findById(long id);
    boolean existsByEmail(String email);


    List<User> getUserByPassword(String password);

    List<User> getUserById(long id);
}
