import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workout } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080'; // Upewnij się, że port się zgadza z Backendem

  constructor() { }

  addWorkout(username: string, workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(`${this.apiUrl}/Workout/User/${username}`, workout);
  }

  getWorkoutsForUser(userId: number): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.apiUrl}/Workout/User/${userId}`);
  }

  // --- NOWA METODA, której brakowało ---
  deleteWorkout(id: number): Observable<any> {
    // Endpoint: DELETE http://localhost:8080/Workout/Delete/{id}
    return this.http.delete(`${this.apiUrl}/Workout/Delete/${id}`);
  }
  updateWorkout(id: number, workoutData: any) {

  return this.http.put<Workout>(`${this.apiUrl}/Workout/Update/${id}`, workoutData);
}
}