package pl.mateuszj.fitlog.models.dto.workoutDto;

import jakarta.persistence.JoinColumn;

import java.util.Date;

public record SaveRunnerRequest(
        Date date,
        Long calories,
        Integer duration,
        Double distance,
        Integer heartRate,
        Double pace,
        Integer cadence,
        Integer stride
) {
}
