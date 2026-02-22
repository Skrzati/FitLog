package pl.mateuszj.fitlog.models.dto.workoutDto;

import pl.mateuszj.fitlog.models.workout.Exercise; // Pamiętaj o imporcie!

import java.util.Date;
import java.util.List; // Pamiętaj o imporcie!

public class ChangeTrainingRequest {
    private long id;
    private Date date;
    private String type;
    private long calories;
    private int duration;

    private List<Exercise> exercises;


    private Double distance;
    private Integer heartRate;
    private Double pace;
    private Integer cadence;
    private Integer stride;




    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public long getCalories() {
        return calories;
    }

    public void setCalories(long calories) {
        this.calories = calories;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    // Nowe gettery i settery dla listy ćwiczeń
    public List<Exercise> getExercises() {
        return exercises;
    }

    public void setExercises(List<Exercise> exercises) {
        this.exercises = exercises;
    }

    public Double getDistance() {
        return distance;
    }

    public void setDistance(Double distance) {
        this.distance = distance;
    }

    public Integer getHeartRate() {
        return heartRate;
    }

    public void setHeartRate(Integer heartRate) {
        this.heartRate = heartRate;
    }

    public Double getPace() {
        return pace;
    }

    public void setPace(Double pace) {
        this.pace = pace;
    }

    public Integer getCadence() {
        return cadence;
    }

    public void setCadence(Integer cadence) {
        this.cadence = cadence;
    }

    public Integer getStride() {
        return stride;
    }

    public void setStride(Integer stride) {
        this.stride = stride;
    }
}