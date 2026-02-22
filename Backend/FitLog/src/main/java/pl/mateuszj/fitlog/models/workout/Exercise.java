package pl.mateuszj.fitlog.models.workout;

import jakarta.persistence.Embeddable;

@Embeddable
public class Exercise {
    private String name;
    private int reps;
    private int count; // serie
    private double weight;

    // Gettery i Settery
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getReps() { return reps; }
    public void setReps(int reps) { this.reps = reps; }
    public int getCount() { return count; }
    public void setCount(int count) { this.count = count; }
    public double getWeight() { return weight; }
    public void setWeight(double weight) { this.weight = weight; }
}