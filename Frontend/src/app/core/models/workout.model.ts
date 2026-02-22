export type WorkoutType = 'CARDIO' | 'Gym';

// Nowy interfejs dla pojedynczego ćwiczenia w liście
export interface GymExerciseDetails {
  name: string;
  reps: number;
  count: number; // serie
  weight: number;
}

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
  // ZMIANA: Zamiast płaskich pól, mamy listę ćwiczeń
  exercises: GymExerciseDetails[];
}

export type Workout = CardioWorkout | GymWorkout;