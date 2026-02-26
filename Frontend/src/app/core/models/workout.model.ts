export interface Exercise {
  name: string;
  series: number;
  reps: number;
  weight: number;
}

export interface Workout {
  id?: number;
  date: string;
  duration: number;
  calories: number;
  type: 'CARDIO' | 'Gym';
  // Pola Cardio
  distance?: number;
  heartRate?: number;
  pace?: number;
  cadence?: number;
  stride?: number;
  // Pola Gym
  exercises?: Exercise[];
}