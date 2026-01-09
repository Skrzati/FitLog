import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
// POPRAWIONE IMPORTY (dwie kropki zamiast trzech):
import { AuthService } from '../../core/auth/auth.service';
import { User } from '../../core/models/auth.model';
import { SettingsService } from '../../core/settings/settings.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private router = inject(Router);
  
  // Publiczny serwis ustawień
  public settingsService = inject(SettingsService);

  userProfile = signal<User | null>(null);

  ngOnInit() {
    const loggedInUser = this.authService.currentUser();

    if (loggedInUser && loggedInUser.id) {
      this.fetchUserData(loggedInUser.id);
    }
  }

  fetchUserData(userId: number) {
    this.http.get<User>(`http://localhost:8080/User/${userId}`)
      .subscribe({
        next: (data) => {
          console.log('Dane z backendu:', data);
          this.userProfile.set(data);
        },
        error: (err) => {
          console.error('Błąd pobierania danych:', err);
        }
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}