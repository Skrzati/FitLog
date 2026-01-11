import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workout } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private http = inject(HttpClient);
  
  // ZMIANA 1: Duża litera 'Workout', zgodnie z Twoim Backendem
  private apiUrl = 'http://localhost:8080/Workout'; 

  // Pobieranie treningów
  getWorkoutsForUser(userId: number): Observable<Workout[]> {
    // ZMIANA 2: Opcja { withCredentials: true }
    // To mówi przeglądarce: "Wyślij ciasteczka sesyjne, jeśli je masz".
    // Często rozwiązuje problem 401, jeśli Backend używa JSESSIONID.
    return this.http.get<Workout[]>(
      `${this.apiUrl}/User/${userId}`, 
      { withCredentials: true }
    );
  }

  // Dodawanie treningu
  addWorkout(username: string, workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(
      `${this.apiUrl}/User/${username}`, // lub `${this.apiUrl}/${username}` zależy jak masz w Javie
      workout,
      { withCredentials: true }
    );
  }
}