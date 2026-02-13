package pl.mateuszj.fitlog.models.dto.workoutDto;

import java.util.Date;

public record SaveGymWorkout(
        Date date,
        long calories,
        int duration,

        String name,
        int reps,
        int count,
        double weight
)
{
}
