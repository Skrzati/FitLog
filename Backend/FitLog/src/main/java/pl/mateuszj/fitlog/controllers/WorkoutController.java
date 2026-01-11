package pl.mateuszj.fitlog.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.mateuszj.fitlog.models.Workouts;
import pl.mateuszj.fitlog.models.dto.UserResponse;
import pl.mateuszj.fitlog.repository.WorkoutRepository;
import pl.mateuszj.fitlog.services.UserService;
import pl.mateuszj.fitlog.services.WorkoutService;

import java.util.List;

@RestController
@RequestMapping("/Workout")
public class WorkoutController {

    private final WorkoutService workoutService;
    private final UserService userService;

    public WorkoutController(WorkoutService workoutService, UserService userService) {
        this.workoutService = workoutService;
        this.userService = userService;
    }

    @PostMapping("/User/{username}")
    public ResponseEntity<?> save(@PathVariable String username, @RequestBody Workouts workouts) {
        
        return ResponseEntity.ok(workoutService.saveWorkouts(username,workouts));
    }
    @GetMapping("/User/{userId}")
    public ResponseEntity<List<Workouts>> getUserWorkouts(@PathVariable Long userId) {
        return ResponseEntity.ok(workoutService.getWorkoutsByUserId(userId));
    }
}
