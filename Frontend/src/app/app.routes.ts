import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { SettingsComponent } from './features/settings/settings.component';
// 1. IMPORTUJ HOME
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  // 2. ZMIEŃ DOMYŚLNĄ ŚCIEŻKĘ: Pusty '' kieruje teraz do HomeComponent
  { path: '', component: HomeComponent },
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'settings', component: SettingsComponent },
  
  // Opcjonalnie: Jeśli wpisze głupoty, też idź do Home
  { path: '**', redirectTo: '' }
];