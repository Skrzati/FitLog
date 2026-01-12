package pl.mateuszj.fitlog.services;

import org.springframework.stereotype.Service;
import pl.mateuszj.fitlog.models.Cardio;
import pl.mateuszj.fitlog.models.Gym;
import pl.mateuszj.fitlog.models.User;
import pl.mateuszj.fitlog.models.Workouts;
import pl.mateuszj.fitlog.models.dto.UserResponse;
import pl.mateuszj.fitlog.models.dto.WorkoutDto;
import pl.mateuszj.fitlog.repository.UserRepository;
import pl.mateuszj.fitlog.repository.WorkoutRepository;

import java.util.Collections;
import java.util.List;

@Service
public class WorkoutService {

    private final WorkoutRepository workoutRepository;
    private final UserRepository userRepository;

    public WorkoutService(WorkoutRepository workoutRepository, UserRepository userRepository) {
        this.workoutRepository = workoutRepository;
        this.userRepository = userRepository;
    }

    public Workouts findUserWorkouts(Long userId) {
        return workoutRepository.findById(userId).orElse(null);
    }
    public Workouts findWorkouts(Long workoutId) {
        return workoutRepository.findById(workoutId).orElse(null);
    }
    public Workouts saveWorkouts(String username,Workouts workouts) {
        User user = userRepository.findByUsername(username).orElseThrow();
            workouts.setUser(user);
            System.out.println("Workouts saved");
        return workoutRepository.save(workouts);
    }
    public List<Workouts> getWorkoutsByUserId(long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika"));

        return workoutRepository.findByUserId(id);
    }
    public Workouts changeTaining(long id,WorkoutDto dto) {
        Workouts existingWorkouts = workoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika"));
        existingWorkouts.setCalories(dto.getDate().getTime());
        existingWorkouts.setDuration(dto.getDuration());
        existingWorkouts.setCalories(dto.getCalories());
        if (existingWorkouts instanceof Gym && "Gym".equals(dto.getType())) {
            Gym gym = (Gym) existingWorkouts;
            gym.setName(dto.getName());
            gym.setCount(dto.getCount());
            gym.setWeight(dto.getWeight());
            gym.setReps(dto.getReps());
        }
        if (existingWorkouts instanceof Gym && "Cardio".equals(dto.getType())) {
            Cardio  cardio = (Cardio) existingWorkouts;
            cardio.setCadence(dto.getCadence());
            cardio.setDistance(dto.getDistance());
            cardio.setPace(dto.getPace());
            cardio.setHeartRate(dto.getHeartRate());
            cardio.setStride(dto.getStride());
        }

        return workoutRepository.save(existingWorkouts);
    }
    public Workouts deleteWorkouts(long id) {
        Workouts workouts = workoutRepository.findById(id).orElse(null);
        workoutRepository.delete(workouts);
        return null;
    }
}
