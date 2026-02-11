import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { tap } from 'rxjs/operators';
import { User } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/User'; 

  // 1. ZMIANA: Inicjalizujemy sygnał sprawdzając localStorage
  // Zamiast 'null', wywołujemy metodę pomocniczą
  currentUser = signal<User | null>(this.getUserFromStorage());

  // 2. NOWA METODA: Sprawdza, czy w przeglądarce są zapisane dane
  private getUserFromStorage(): User | null {
    // Sprawdzamy czy localStorage jest dostępne (dobrej praktyki)
    if (typeof localStorage !== 'undefined') {
      const storedUser = localStorage.getItem('loggedUser');
      if (storedUser) {
        try {
          return JSON.parse(storedUser);
        } catch (e) {
          console.error('Błąd odczytu danych użytkownika', e);
          return null;
        }
      }
    }
    return null;
  }

  login(user: User) {
    return this.http.post<User>(`${this.apiUrl}/Login`, user).pipe(
      tap((responseUser) => {
        this.currentUser.set(responseUser);
        
        // 3. ZMIANA: Zapisujemy użytkownika w localStorage po udanym logowaniu
        localStorage.setItem('loggedUser', JSON.stringify(responseUser));
      })
    );
  }

  register(user: User) {
    return this.http.post<User>(`${this.apiUrl}/Register`, user).pipe(
      tap((responseUser) => {
        this.currentUser.set(responseUser);
        
        // 4. ZMIANA: Przy rejestracji też zapisujemy, żeby od razu był zalogowany
        localStorage.setItem('loggedUser', JSON.stringify(responseUser));
      })
    );
  }

  logout() {
    this.currentUser.set(null);
    
    // 5. ZMIANA: Czyścimy pamięć przy wylogowaniu
    localStorage.removeItem('loggedUser');
  }
}