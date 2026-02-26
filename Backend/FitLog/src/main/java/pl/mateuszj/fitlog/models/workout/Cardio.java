package pl.mateuszj.fitlog.models.workout;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("CARDIO")
public class Cardio extends Workouts {

    private Double distance;
    private Integer heartRate;
    private Double pace;
    private Integer cadence;
    private Integer stride;


    public Double getDistance() { return distance; }
    public void setDistance(Double distance) { this.distance = distance; }

    public Integer getHeartRate() { return heartRate; }
    public void setHeartRate(Integer heartRate) { this.heartRate = heartRate; }

    public Double getPace() { return pace; }
    public void setPace(Double pace) { this.pace = pace; }

    public Integer getCadence() { return cadence; }
    public void setCadence(Integer cadence) { this.cadence = cadence; }

    public Integer getStride() { return stride; }
    public void setStride(Integer stride) { this.stride = stride; }
}
