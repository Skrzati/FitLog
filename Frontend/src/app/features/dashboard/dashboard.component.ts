import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/auth.model';
import { SettingsService } from '../../core/settings/settings.service';
import { WorkoutService } from '../../core/services/workout.service';
import { Workout, WorkoutType } from '../../core/models/workout.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private router = inject(Router);
  private workoutService = inject(WorkoutService);
  
  public settingsService = inject(SettingsService);

  userProfile = signal<User | null>(null);
  
  // Lista treningów
  userWorkouts = signal<Workout[]>([]);
  isLoadingWorkouts = signal<boolean>(false);

  // --- Zmienne do obsługi formularza ---
  showAddForm = signal<boolean>(false);
  
  // WAŻNE: Tu musi być typ zgodny z modelem ('Gym')
  selectedType = signal<WorkoutType>('CARDIO');

  newWorkout: any = {
    type: 'CARDIO', // Domyślny typ
    date: new Date().toISOString().split('T')[0],
    duration: 0,
    calories: 0,
    
    // Pola Cardio
    distance: 0,
    heartRate: 0,
    pace: 0,
    cadence: 0,
    stride: 0,

    // Pola Gym
    name: '',
    reps: 0,
    count: 0,
    weight: 0
  };

  ngOnInit() {
    const loggedInUser = this.authService.currentUser();

    if (loggedInUser && loggedInUser.id) {
      this.fetchUserData(loggedInUser.id);
      this.fetchUserWorkouts(loggedInUser.id);
    }
  }

  fetchUserData(userId: number) {
    this.http.get<User>(`http://localhost:8080/User/${userId}`)
      .subscribe({
        next: (data) => this.userProfile.set(data),
        error: (err) => console.error('Błąd profilu:', err)
      });
  }

  fetchUserWorkouts(userId: number) {
    this.isLoadingWorkouts.set(true);
    this.workoutService.getWorkoutsForUser(userId).subscribe({
      next: (data) => {
        // Sortowanie: najnowsze na górze
        const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.userWorkouts.set(sortedData);
        this.isLoadingWorkouts.set(false);
      },
      error: (err) => {
        console.error('Błąd treningów:', err);
        this.isLoadingWorkouts.set(false);
      }
    });
  }

  toggleForm() {
    this.showAddForm.update(val => !val);
  }

  setWorkoutType(type: WorkoutType) {
    this.selectedType.set(type);
    this.newWorkout.type = type;
  }

  submitWorkout() {
    const user = this.userProfile();
    
    if (user && user.username) {
      this.newWorkout.type = this.selectedType();

      this.workoutService.addWorkout(user.username, this.newWorkout).subscribe({
        next: (response) => {
          console.log('Dodano trening:', response);
          if (user.id) this.fetchUserWorkouts(user.id);
          this.toggleForm();
          this.resetForm();
        },
        error: (err) => {
          console.error('Błąd dodawania:', err);
          alert('Błąd zapisu. Sprawdź konsolę.');
        }
      });
    }
  }

  resetForm() {
    const currentType = this.selectedType();
    
    this.newWorkout = {
      type: currentType,
      date: new Date().toISOString().split('T')[0],
      duration: 0,
      calories: 0,
      
      // Reset Cardio
      distance: 0,
      heartRate: 0,
      pace: 0,
      cadence: 0,
      stride: 0,

      // Reset Gym
      name: '',
      reps: 0,
      count: 0,
      weight: 0
    };
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}