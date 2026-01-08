package pl.mateuszj.fitlog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.mateuszj.fitlog.models.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String Email);

    boolean existsByEmail(String email);


    List<User> getUserByPassword(String password);
}
