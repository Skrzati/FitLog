package pl.mateuszj.fitlog.models.dto.workoutDto;

import pl.mateuszj.fitlog.models.workout.Exercise;
import java.util.Date;
import java.util.List;

public record SaveGymWorkout(
        Date date,
        long calories,
        Integer duration,
        List<Exercise> exercises
) {
}