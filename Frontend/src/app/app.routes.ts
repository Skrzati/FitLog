import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { WorkoutListComponent } from './features/workout-list/workout-list.component'; // <--- IMPORT
import { SettingsComponent } from './features/settings/settings.component';
import { authGuard } from './core/guards/auth.guard'; // Zakładam, że masz guarda

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Strefa Chroniona
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [authGuard] 
  },
  { 
    path: 'workouts', 
    component: WorkoutListComponent, // <--- NOWA TRASA
    canActivate: [authGuard] 
  },
  { 
    path: 'settings', 
    component: SettingsComponent,
    canActivate: [authGuard]
  }
];