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

  // 1. Suma Kalorii
  totalCalories = computed(() => {
    return this.userWorkouts().reduce((acc, curr) => acc + (curr.calories || 0), 0);
  });

  // 2. Dane do wykresu (Ostatnie 7 dni)
weeklyChartData = computed(() => {
  const workouts = this.userWorkouts();
  const days = [];
  const today = new Date();
  
  // Czyścimy dzisiejszą datę z godzin, by porównywać same dni
  today.setHours(0, 0, 0, 0);

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    
    // Tworzymy format YYYY-MM-DD niezależny od strefy czasowej (lokalny)
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const localDateStr = `${year}-${month}-${day}`;
    
    const dailyKcal = workouts
      .filter(w => {
        // Konwertujemy datę treningu na format lokalny YYYY-MM-DD
        const wDate = new Date(w.date);
        const wYear = wDate.getFullYear();
        const wMonth = String(wDate.getMonth() + 1).padStart(2, '0');
        const wDay = String(wDate.getDate()).padStart(2, '0');
        return `${wYear}-${wMonth}-${wDay}` === localDateStr;
      })
      .reduce((sum, w) => sum + (w.calories || 0), 0);

    days.push({
      dayName: d.toLocaleDateString('pl-PL', { weekday: 'short' }),
      value: dailyKcal,
      date: localDateStr
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

    // Zmiana: pobieramy po ID
    if (user && user.id) {
      this.workoutService.getWorkoutsForUser(user.id).subscribe({
        next: (data) => {
          const sorted = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          this.userWorkouts.set(sorted);
        },
        error: (err) => console.error("Błąd pobierania danych do dashboardu", err)
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}