import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/auth.model';
import { SettingsService } from '../../core/settings/settings.service';
import { WorkoutService } from '../../core/services/workout.service';
import { Workout } from '../../core/models/workout.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private workoutService = inject(WorkoutService);
  private router = inject(Router);
  public settingsService = inject(SettingsService);

  userProfile = signal<User | null>(null);
  userWorkouts = signal<Workout[]>([]);

  // 1. Suma Kalorii (Twoje istniejące computed)
  totalCalories = computed(() => {
    return this.userWorkouts().reduce((acc, curr) => acc + (curr.calories || 0), 0);
  });

  // 2. Dane do wykresu (Ostatnie 7 dni)
  weeklyChartData = computed(() => {
    const workouts = this.userWorkouts();
    const days = [];
    const today = new Date();
    
    // Generujemy ostatnie 7 dni
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      const dailyKcal = workouts
        .filter(w => w.date.startsWith(dateStr))
        .reduce((sum, w) => sum + (w.calories || 0), 0);

      days.push({
        dayName: d.toLocaleDateString('pl-PL', { weekday: 'short' }),
        value: dailyKcal,
        date: dateStr
      });
    }

    const maxVal = Math.max(...days.map(d => d.value), 1);

    return days.map(d => ({
      ...d,
      heightPercent: Math.round((d.value / maxVal) * 100)
    }));
  });

  ngOnInit() {
    const user = this.authService.currentUser();
    this.userProfile.set(user);

    if (user && user.id) {
      this.workoutService.getWorkoutsForUser(user.id).subscribe({
        next: (data) => {
          // Sortowanie od najnowszych
          const sorted = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          this.userWorkouts.set(sorted);
        }
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}