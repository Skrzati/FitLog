import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../../core/services/workout.service';
import { AuthService } from '../../core/services/auth.service';
import { Workout, Exercise } from '../../core/models/workout.model';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.scss'
})
export class WorkoutListComponent implements OnInit {
  userWorkouts = signal<Workout[]>([]);
  showAddForm = signal(false); 
  // POPRAWKA: Przywrócono 'selectedType' tak jak oczekuje tego Twój HTML
  selectedType = signal<'CARDIO' | 'Gym'>('CARDIO'); 
  isEditing = signal(false);
  editingId = signal<number | null>(null);
  isLoading = signal(false);

  currentExercise = { name: '', series: 0, reps: 0, weight: 0, count: 0 };

  totalWorkouts = computed(() => this.userWorkouts().length);
  totalDuration = computed(() => this.userWorkouts().reduce((acc, w) => acc + (w.duration || 0), 0));
  totalKcal = computed(() => this.userWorkouts().reduce((acc, w) => acc + (w.calories || 0), 0));

  newWorkout: any = {
    date: new Date().toISOString().substring(0, 10),
    duration: 0,
    calories: 0,
    exercises: [] as Exercise[]
  };

  constructor(
    private workoutService: WorkoutService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.authService.currentUser();
    if (user && user.id) {
      this.fetchWorkouts(user.id);
    }
  }

  fetchWorkouts(userId: number) {
    this.isLoading.set(true);
    this.workoutService.getWorkoutsForUser(userId).subscribe({
      next: (data: Workout[]) => {
        this.userWorkouts.set(data);
        this.isLoading.set(false);
      },
      error: (err: any) => {
        console.error('Błąd pobierania:', err);
        this.isLoading.set(false);
      }
    });
  }

  setWorkoutType(type: 'CARDIO' | 'Gym') {
    this.selectedType.set(type); // POPRAWKA
  }

  addExerciseToForm() {
    if (this.currentExercise.name) {
      this.newWorkout.exercises.push({ ...this.currentExercise });
      this.currentExercise = { name: '', series: 0, reps: 0, weight: 0, count: 0 };
    }
  }

  removeExerciseFromForm(index: number) {
    this.newWorkout.exercises.splice(index, 1);
  }

  toggleForm() {
    this.showAddForm.set(!this.showAddForm());
    if (!this.showAddForm()) this.resetForm();
  }

  submitWorkout() {
    const user = this.authService.currentUser();
    if (!user || !user.id) return;

    const type = this.selectedType(); // POPRAWKA
    const payload = {
      ...this.newWorkout,
      type: type,
      duration: Number(this.newWorkout.duration || 0),
      calories: Number(this.newWorkout.calories || 0)
    };

    if (this.isEditing() && this.editingId()) {
      this.workoutService.updateWorkout(this.editingId()!, payload).subscribe({
        next: () => {
          this.fetchWorkouts(user.id!);
          this.toggleForm();
        },
        error: (err) => alert("Błąd edycji")
      });
    } else {
      this.workoutService.addWorkout(user.id, payload).subscribe({
        next: () => {
          this.fetchWorkouts(user.id!);
          this.toggleForm();
        },
        error: (err) => alert("Błąd zapisu")
      });
    }
  }

  startEdit(workout: any) {
    this.isEditing.set(true);
    this.editingId.set(workout.id);
    this.selectedType.set(workout.type); // POPRAWKA
    this.newWorkout = { ...workout, date: workout.date?.substring(0, 10) };
    this.showAddForm.set(true);
  }

  // POPRAWKA: Dopuszczamy parametr 'number | undefined', by zapobiec błędowi TS2345
  deleteWorkoutHandler(id: number | undefined) {
    if (!id) return; // Zabezpieczenie na wypadek braku ID
    
    if (confirm('Usunąć trening?')) {
      this.workoutService.deleteWorkout(id).subscribe(() => {
        this.userWorkouts.update(list => list.filter(w => w.id !== id));
      });
    }
  }

  private resetForm() {
    this.isEditing.set(false);
    this.editingId.set(null);
    this.newWorkout = {
      date: new Date().toISOString().substring(0, 10),
      duration: 0,
      calories: 0,
      exercises: []
    };
  }
}