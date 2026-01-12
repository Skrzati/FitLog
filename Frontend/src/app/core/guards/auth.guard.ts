import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Sprawdzamy, czy użytkownik jest zalogowany
  if (authService.currentUser()) {
    return true;
  } else {
    // Jeśli nie, przekieruj do logowania
    router.navigate(['/login']);
    return false;
  }
};