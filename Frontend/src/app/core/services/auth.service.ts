import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { tap } from 'rxjs/operators';
import { User } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  // Adres Twojego backendu
  private apiUrl = 'http://localhost:8080'; 

  // Stan zalogowanego użytkownika
  currentUser = signal<User | null>(null);

  // Logowanie: Backend oczekuje obiektu User na endpointcie /Login
  login(user: User) {
    return this.http.post<User>(`${this.apiUrl}/Login`, user).pipe(
      tap((responseUser) => {
        // Zapisujemy zalogowanego użytkownika w aplikacji
        this.currentUser.set(responseUser);
      })
    );
  }

  // Rejestracja: Backend oczekuje obiektu User na endpointcie /Register
  register(user: User) {
    return this.http.post<User>(`${this.apiUrl}/Register`, user).pipe(
      tap((responseUser) => {
        this.currentUser.set(responseUser);
      })
    );
  }

  logout() {
    this.currentUser.set(null);
  }
}