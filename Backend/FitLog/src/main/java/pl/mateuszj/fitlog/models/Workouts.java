package pl.mateuszj.fitlog.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter; // Jeśli używasz Lomboka, jeśli nie - zostaw gettery/settery
import lombok.Setter;

import java.time.Duration;
import java.util.Date;

@Entity
@Table(name = "Workout")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "workout_type", discriminatorType = DiscriminatorType.STRING)
public class Workouts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private Date date;
    private Long calories; // Zmieniłem nazwę z Calories na calories (mała litera - konwencja Java)

    // UWAGA: Duration w bazie często sprawia problemy.
    // Jeśli będziesz miał błędy, zmień to na 'private int duration;' (minuty)
    private int duration;

    // --- ZMIANA TUTAJ ---
    // Zamiast List<User>, dajemy pojedynczego Usera
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore // Żeby nie było pętli w JSON
    private User user;

    // Gettery i Settery (jeśli nie masz Lomboka)
    public long getId() { return id; }
    public void setId(long id) { this.id = id; }
    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }
    public int getDuration() { return duration; }
    public void setDuration(int duration) { this.duration = duration; }
    public Long getCalories() { return calories; }
    public void setCalories(Long calories) { this.calories = calories; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}