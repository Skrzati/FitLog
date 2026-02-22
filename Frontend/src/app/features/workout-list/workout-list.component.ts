import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { WorkoutService } from '../../core/services/workout.service';
import { Workout, WorkoutType } from '../../core/models/workout.model';
import { User } from '../../core/models/auth.model';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss']
})
export class WorkoutListComponent implements OnInit {
  private authService = inject(AuthService);
  private workoutService = inject(WorkoutService);

  userWorkouts = signal<Workout[]>([]);
  isLoading = signal<boolean>(false);
  
  // Stan formularza
  showAddForm = signal<boolean>(false);
  isEditing = signal<boolean>(false);
  editingId = signal<number | null>(null);
  
  selectedType = signal<WorkoutType>('CARDIO');
  currentUser = signal<User | null>(null);

  // Statystyki
  totalWorkouts = computed(() => this.userWorkouts().length);
  totalDuration = computed(() => this.userWorkouts().reduce((acc, w) => acc + w.duration, 0));
  totalKcal = computed(() => this.userWorkouts().reduce((acc, w) => acc + (w.calories || 0), 0));

  // Główny model treningu
  newWorkout: any = {
    type: 'CARDIO',
    date: new Date().toISOString().split('T')[0],
    duration: null, 
    calories: null,
    distance: null, 
    heartRate: null, 
    pace: null, 
    cadence: null, 
    stride: null,
    exercises: [] // Tablica na ćwiczenia siłowe!
  };

  // Tymczasowy model dla pojedynczego ćwiczenia wpisywanego do formularza
  currentExercise: any = {
    name: '',
    weight: null,
    count: null,
    reps: null
  };

  ngOnInit() {
    const user = this.authService.currentUser();
    this.currentUser.set(user);
    if (user && user.id) {
      this.fetchWorkouts(user.id);
    }
  }

  fetchWorkouts(userId: number) {
    this.isLoading.set(true);
    this.workoutService.getWorkoutsForUser(userId).subscribe({
      next: (data) => {
        const sorted = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.userWorkouts.set(sorted);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }

  toggleForm() {
    if (this.showAddForm()) this.resetForm();
    this.showAddForm.update(val => !val);
  }

  setWorkoutType(type: WorkoutType) {
    this.selectedType.set(type);
    this.newWorkout.type = type;
  }

  // --- LOGIKA DODAWANIA ĆWICZEŃ (SIŁOWNIA) ---
  addExerciseToForm() {
    if (!this.currentExercise.name || this.currentExercise.name.trim() === '') {
      alert("Podaj przynajmniej nazwę ćwiczenia!");
      return;
    }
    
    // Upewniamy się, że tablica istnieje
    if (!this.newWorkout.exercises) {
      this.newWorkout.exercises = [];
    }
    
    // Klonujemy obiekt ćwiczenia i dodajemy do listy
    this.newWorkout.exercises.push({ ...this.currentExercise });
    
    // Czyścimy mały formularz dla kolejnego ćwiczenia
    this.currentExercise = { name: '', weight: null, count: null, reps: null };
  }

  removeExerciseFromForm(index: number) {
    this.newWorkout.exercises.splice(index, 1);
  }
  // ------------------------------------------

  startEdit(workout: any) {
    this.isEditing.set(true);
    this.editingId.set(workout.id!);
    this.showAddForm.set(true);
    this.setWorkoutType(workout.type);
    
    this.newWorkout = {
      ...workout,
      date: new Date(workout.date).toISOString().split('T')[0]
    };

    // Zabezpieczenie, jeśli edytowany trening siłowy nie ma jeszcze tablicy ćwiczeń
    if (workout.type === 'Gym' && !this.newWorkout.exercises) {
      this.newWorkout.exercises = [];
    }

    const formElement = document.querySelector('.add-workout-form');
    if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
  }

  submitWorkout() {
    const user = this.currentUser();
    if (!user || !user.id) {
        alert("Błąd: Nie znaleziono ID użytkownika. Zaloguj się ponownie.");
        return;
    }

    const userId = user.id;
    this.newWorkout.type = this.selectedType();

    // Walidacja: czy trening siłowy ma chociaż jedno ćwiczenie
    if (this.selectedType() === 'Gym' && (!this.newWorkout.exercises || this.newWorkout.exercises.length === 0)) {
        alert("Trening siłowy musi zawierać przynajmniej jedno ćwiczenie!");
        return;
    }

    if (this.isEditing() && this.editingId()) {
      const id = this.editingId()!;
      this.workoutService.updateWorkout(id, this.newWorkout).subscribe({
        next: (updatedWorkout) => {
          this.userWorkouts.update(list => list.map(w => w.id === id ? updatedWorkout : w));
          this.showAddForm.set(false);
          this.resetForm();
        },
        error: (err) => {
            console.error(err);
            alert('Błąd edycji');
        }
      });
    } else {
      this.workoutService.addWorkout(userId, this.newWorkout).subscribe({
        next: (createdWorkout) => {
          if(createdWorkout) {
             this.userWorkouts.update(list => [createdWorkout, ...list]);
          } else {
             this.fetchWorkouts(userId);
          }
          this.showAddForm.set(false);
          this.resetForm();
        },
        error: (err) => {
            console.error(err);
            alert('Błąd zapisu');
        }
      });
    }
  }

  deleteWorkoutHandler(id: number | undefined) {
    if (!id) return;
    if (confirm('Czy na pewno chcesz usunąć ten trening?')) {
      this.workoutService.deleteWorkout(id).subscribe({
        next: () => {
          this.userWorkouts.update(list => list.filter(w => w.id !== id));
        },
        error: () => alert('Nie udało się usunąć.')
      });
    }
  }

  resetForm() {
    this.isEditing.set(false);
    this.editingId.set(null);
    const currentType = this.selectedType();
    
    // Reset głównego modelu
    this.newWorkout = {
      type: currentType,
      date: new Date().toISOString().split('T')[0],
      duration: null, calories: null,
      distance: null, heartRate: null, pace: null, cadence: null, stride: null,
      exercises: []
    };
    
    // Reset modelu tymczasowego ćwiczenia
    this.currentExercise = { name: '', weight: null, count: null, reps: null };
  }
}