import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/User'; 

  // ZMIANA: Dodano opcjonalne firstName do typu danych
  updateProfile(id: number, data: { username: string, email: string, firstName?: string }): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, data);
  }

  // Zmiana hasła
  changePassword(id: number, data: { oldPassword: string, newPassword: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/password`, data, { responseType: 'text' });
  }
}