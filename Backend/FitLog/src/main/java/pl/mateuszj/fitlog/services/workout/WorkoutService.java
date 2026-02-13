package pl.mateuszj.fitlog.services.workout;

import org.springframework.stereotype.Service;
import pl.mateuszj.fitlog.models.dto.workoutDto.SaveGymWorkout;
import pl.mateuszj.fitlog.models.dto.workoutDto.SaveRunnerRequest;
import pl.mateuszj.fitlog.models.workout.Cardio;
import pl.mateuszj.fitlog.models.workout.Gym;
import pl.mateuszj.fitlog.models.user.User;
import pl.mateuszj.fitlog.models.workout.Workouts;
import pl.mateuszj.fitlog.models.dto.workoutDto.WorkoutDto;
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

    public Workouts saveRuning(long id , SaveRunnerRequest run){
        if(userRepository.findById(id).isPresent()){
            User user = userRepository.findById(id).get();
            Cardio cardio = new Cardio();
            cardio.setUser(user);
            cardio.setCalories(run.calories());
            cardio.setDate(run.date());
            cardio.setDuration(run.duration());
            cardio.setCadence(run.cadence());
            cardio.setDistance(run.distance());
            cardio.setHeartRate(run.heartRate());
            cardio.setPace(run.pace());
            cardio.setStride(run.stride());
            return workoutRepository.save(cardio);
        }
        else {
            throw new RuntimeException("Nie znaleziono użytkownika");
        }
    }

    public Workouts saveGymWorkout(long id , SaveGymWorkout saveGymWorkout) {
        if(userRepository.findById(id).isPresent()){
            User user = userRepository.findById(id).get();
            Gym gym = new Gym();
            gym.setUser(user);
            gym.setCalories(saveGymWorkout.calories());
            gym.setDate(saveGymWorkout.date());
            gym.setDuration(saveGymWorkout.duration());
            gym.setName(saveGymWorkout.name());
            gym.setCount(saveGymWorkout.count());
            gym.setReps(saveGymWorkout.reps());
            gym.setWeight(saveGymWorkout.weight());
            return workoutRepository.save(gym);
        }
        else {
            throw new RuntimeException("Nie znaleziono użytkownika");
        }
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
        Workouts existingWorkouts = workoutRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika"));
        if(existingWorkouts instanceof Gym) {
            workoutRepository.delete(existingWorkouts);
            return  existingWorkouts;
        }
        else  if(existingWorkouts instanceof Cardio) {
            workoutRepository.delete(existingWorkouts);
            return  existingWorkouts;
        }
        return null;
    }
}
