package pl.mateuszj.fitlog.models.workout;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;
import pl.mateuszj.fitlog.models.user.User;

import java.util.Date;

@Entity
@Table(name = "Workout")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "workout_type", discriminatorType = DiscriminatorType.STRING)
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = Gym.class, name = "Gym"),
        @JsonSubTypes.Type(value = Cardio.class, name = "CARDIO")
})
public class Workouts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private Date date;
    private Long calories;
    private int duration;


    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;


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