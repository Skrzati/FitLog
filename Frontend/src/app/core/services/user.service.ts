import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  // Zakładam, że Twój UserController ma @RequestMapping("/User")
  private apiUrl = 'http://localhost:8080/user'; 

  // Endpoint: @PutMapping("/username/id/{id}")
  // Body: ChangeUsernameRequest { newUsername: string }
  changeUsername(id: number, newUsername: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/username/id/${id}`, { newUsername });
  }

  // Endpoint: @PutMapping("/password/id/{id}")
  // Body: ChangePasswordRequest { oldPassword: string, newPassword: string }
  changePassword(id: number, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/password/id/${id}`, { oldPassword, newPassword });
  }
}