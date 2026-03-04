package pl.mateuszj.fitlog.services.workout;

import org.springframework.stereotype.Service;
import pl.mateuszj.fitlog.models.dto.workoutDto.SaveGymWorkout;
import pl.mateuszj.fitlog.models.dto.workoutDto.SaveRunnerRequest;
import pl.mateuszj.fitlog.models.workout.Cardio;
import pl.mateuszj.fitlog.models.workout.Gym;
import pl.mateuszj.fitlog.models.user.User;
import pl.mateuszj.fitlog.models.workout.Workouts;
import pl.mateuszj.fitlog.models.dto.workoutDto.ChangeTrainingRequest;
import pl.mateuszj.fitlog.repository.UserRepository;
import pl.mateuszj.fitlog.repository.WorkoutRepository;

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

    public Workouts saveRuning(Long id, SaveRunnerRequest run) {
        if (userRepository.findById(id).isPresent()) {
            User user = userRepository.findById(id).get();
            Cardio cardio = Cardio.builder()
                    .user(user)
                    .calories(run.calories())
                    .date(run.date())
                    .duration(run.duration())
                    .cadence(run.cadence())
                    .distance(run.distance())
                    .heartRate(run.heartRate())
                    .pace(run.pace())
                    .stride(run.stride())
                    .build();

            return workoutRepository.save(cardio);
        } else {
            throw new RuntimeException("Nie znaleziono użytkownika");
        }
    }

    public Workouts saveGymWorkout(Long id, SaveGymWorkout saveGymWorkout) {
        if (userRepository.findById(id).isPresent()) {
            User user = userRepository.findById(id).get();

            Gym gym = Gym.builder()
                    .user(user)
                    .calories(saveGymWorkout.calories())
                    .date(saveGymWorkout.date())
                    .duration(saveGymWorkout.duration())
                    .exercises(saveGymWorkout.exercises())
                    .build();

            return workoutRepository.save(gym);
        } else {
            throw new RuntimeException("Nie znaleziono użytkownika");
        }
    }

    public List<Workouts> getWorkoutsByUserId(Long id) {
        userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika"));

        return workoutRepository.findByUserId(id);
    }

    public Workouts changeTaining(Long id, ChangeTrainingRequest dto) {
        Workouts existingWorkout = workoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono treningu o ID: " + id));


        existingWorkout.setDate(dto.getDate());
        existingWorkout.setDuration(dto.getDuration());
        existingWorkout.setCalories(dto.getCalories());


        updateSpecificWorkoutFields(existingWorkout, dto);

        return workoutRepository.save(existingWorkout);
    }

    private void updateSpecificWorkoutFields(Workouts workout, ChangeTrainingRequest dto) {

        switch (workout) {
            case Gym gym when "Gym".equals(dto.getType()) -> {

                if (dto.getExercises() != null) {
                    gym.setExercises(dto.getExercises());
                }
            }
            case Cardio cardio when "Cardio".equalsIgnoreCase(dto.getType()) -> {
                if (dto.getCadence() != null) cardio.setCadence(dto.getCadence());
                if (dto.getDistance() != null) cardio.setDistance(dto.getDistance());
                if (dto.getPace() != null) cardio.setPace(dto.getPace());
                if (dto.getHeartRate() != null) cardio.setHeartRate(dto.getHeartRate());
                if (dto.getStride() != null) cardio.setStride(dto.getStride());
            }
            default -> throw new IllegalArgumentException(
                "Nieprawidłowy typ treningu: " + dto.getType() +
                " dla obiektu " + workout.getClass().getSimpleName()
            );
        }
    }

    public Workouts deleteWorkouts(Long id) {
        Workouts workout = workoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono treningu"));
        workoutRepository.delete(workout);
        return workout;
    }
}
