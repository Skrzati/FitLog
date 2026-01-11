export type WorkoutType = 'CARDIO' | 'Gym';

export interface WorkoutBase {
  id?: number;
  type: WorkoutType;
  date: string;
  duration: number;
  calories: number;
}

export interface CardioWorkout extends WorkoutBase {
  type: 'CARDIO';
  distance: number;
  heartRate: number;
  pace: number;
  cadence: number;
  stride: number;
}

export interface GymWorkout extends WorkoutBase {
  type: 'Gym';
  name: string;   // Nazwa ćwiczenia
  reps: number;   // Powtórzenia
  count: number;  // Serie
  weight: number; // Ciężar
}

export type Workout = CardioWorkout | GymWorkout;