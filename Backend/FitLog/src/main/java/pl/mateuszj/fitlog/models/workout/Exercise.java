package pl.mateuszj.fitlog.models.workout;

import jakarta.persistence.Embeddable;

@Embeddable
public class Exercise {
    private String name;
    private Integer reps;
    private Integer count; // serie
    private Double weight;

    // Gettery i Settery
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Integer getReps() { return reps; }
    public void setReps(Integer reps) { this.reps = reps; }
    public Integer getCount() { return count; }
    public void setCount(Integer count) { this.count = count; }
    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }
}