package pl.mateuszj.fitlog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.mateuszj.fitlog.models.Workouts;

import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workouts,Long> {
    List<Workouts> findByUserId(Long userId);
}
