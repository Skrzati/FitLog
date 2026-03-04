package pl.mateuszj.fitlog.models.user;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import pl.mateuszj.fitlog.models.workout.Workouts;

import java.util.List;

@Entity
@Builder
@Table(name = "Users")
@NoArgsConstructor
@AllArgsConstructor
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Imię nie może być puste")
    @Size(min = 2, max = 50, message = "Imię musi mieć od 2 do 50 znaków")
    private String firstName;

    @NotBlank(message = "Nazwisko nie może być puste")
    @Size(min = 2, max = 50, message = "Nazwisko musi mieć od 2 do 50 znaków")
    private String lastName;

    @Email(message = "Nieprawidłowy format email")
    @NotBlank(message = "Email nie może być pusty")
    private String email;

    @NotBlank(message = "Hasło nie może być puste")
    @Size(min = 8, max = 100, message = "Hasło musi mieć minimum 8 znaków")
    private String password;

    @NotBlank(message = "Nazwa użytkownika nie może być pusta")
    @Size(min = 3, max = 30, message = "Nazwa użytkownika musi mieć od 3 do 30 znaków")
    private String username;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "workout_id")
    private List<Workouts> workouts;


    public List<Workouts> getWorkouts() {
        return workouts;
    }

    public void setWorkouts(List<Workouts> workouts) {
        this.workouts = workouts;
    }

    @Enumerated(EnumType.STRING)
    private Role role;

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
