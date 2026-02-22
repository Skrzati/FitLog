package pl.mateuszj.fitlog.models.workout;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@DiscriminatorValue("Gym")
public class Gym extends Workouts {

    // Tworzy relację jeden-do-wielu w bazie danych (tabela gym_exercises)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "gym_exercises", joinColumns = @JoinColumn(name = "workout_id"))
    private List<Exercise> exercises = new ArrayList<>();

    public List<Exercise> getExercises() {
        return exercises;
    }

    public void setExercises(List<Exercise> exercises) {
        this.exercises = exercises;
    }
}