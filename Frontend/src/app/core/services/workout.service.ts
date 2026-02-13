import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workout } from '../models/workout.model'; // Upewnij się, że ścieżka jest poprawna

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/workout'; // Bazowy URL kontrolera

  constructor() { }

  // Zmiana: Przyjmujemy userId (number) zamiast username
  addWorkout(userId: number, workout: any): Observable<Workout> {
    // Rozdzielamy logikę w zależności od typu, aby trafić w odpowiednie DTO na backendzie
    if (workout.type === 'CARDIO') {
      // Backend: @PostMapping("/user/run/{id}") -> SaveRunnerRequest
      return this.http.post<Workout>(`${this.apiUrl}/user/run/${userId}`, workout);
    } else {
      // Backend: @PostMapping("/user/gym/{id}") -> SaveGymWorkout
      return this.http.post<Workout>(`${this.apiUrl}/user/gym/${userId}`, workout);
    }
  }

  getWorkoutsForUser(userId: number): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.apiUrl}/user/${userId}`);
  }

  deleteWorkout(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  updateWorkout(id: number, workoutData: any): Observable<Workout> {
    return this.http.put<Workout>(`${this.apiUrl}/update/${id}`, workoutData);
  }
}