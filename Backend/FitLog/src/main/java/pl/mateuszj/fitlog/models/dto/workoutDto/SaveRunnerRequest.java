package pl.mateuszj.fitlog.models.dto.workoutDto;

import jakarta.persistence.JoinColumn;

import java.util.Date;

public record SaveRunnerRequest(

        Date date,
        long calories,
        int duration,

        double distance,
         int heartRate,
         double pace,
         int cadence,
         int stride
) {
}
