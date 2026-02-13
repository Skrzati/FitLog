package pl.mateuszj.fitlog.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.mateuszj.fitlog.models.dto.workoutDto.SaveRunnerRequest;
import pl.mateuszj.fitlog.models.workout.Workouts;
import pl.mateuszj.fitlog.models.dto.workoutDto.WorkoutDto;
import pl.mateuszj.fitlog.services.user.UserService;
import pl.mateuszj.fitlog.services.workout.WorkoutService;

import java.util.List;

@RestController
@RequestMapping("/workout")
public class WorkoutController {

    private final WorkoutService workoutService;
    private final UserService userService;

    public WorkoutController(WorkoutService workoutService, UserService userService) {
        this.workoutService = workoutService;
        this.userService = userService;
    }

    @PostMapping("/user/{username}")
    public ResponseEntity<?> saveWorkout(@PathVariable String username, @RequestBody Workouts workouts) {
        
        return ResponseEntity.ok(workoutService.saveWorkouts(username,workouts));
    }
    @PostMapping("/user/run/{id}")
    public ResponseEntity<?> saveRunning(@PathVariable long id, @RequestBody SaveRunnerRequest run) {
        return ResponseEntity.ok(workoutService.saveRuning(id, run));
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Workouts>> getUserWorkouts(@PathVariable Long userId) {
        return ResponseEntity.ok(workoutService.getWorkoutsByUserId(userId));
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateWorkout(@PathVariable("id") long workoutId, @RequestBody WorkoutDto workoutsDto) {
        return ResponseEntity.ok(workoutService.changeTaining(workoutId,workoutsDto));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletaWorkout(@PathVariable("id") long workoutId) {
        return ResponseEntity.ok(workoutService.deleteWorkouts(workoutId));
    }
}
