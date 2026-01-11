import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  // Zmieniliśmy nazwę pola z 'email' na 'identifier', bo może to być nick
  loginForm = this.fb.nonNullable.group({
    identifier: ['', Validators.required], 
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMessage = '';

  onSubmit() {
    if (this.loginForm.valid) {
      this.errorMessage = '';
      const formValues = this.loginForm.getRawValue();
      
      // --- MAGIA LOGOWANIA ---
      // Sprawdzamy czy wpisano email (czy zawiera @)
      const isEmail = formValues.identifier.includes('@');

      // Tworzymy obiekt User dynamicznie
      const userPayload: User = {
        password: formValues.password,
        // Jeśli ma @ to wysyłamy jako email, jeśli nie to jako username
        email: isEmail ? formValues.identifier : undefined,
        username: !isEmail ? formValues.identifier : undefined
      };

      this.authService.login(userPayload).subscribe({
        next: (user) => {
          console.log('Zalogowano:', user);
          this.router.navigate(['/dashboard']); 
        },
        error: (err) => {
          console.error('Błąd logowania:', err);
          if (err.error && typeof err.error === 'string') {
            this.errorMessage = err.error; 
          } else {
            this.errorMessage = 'Błędny login lub hasło.';
          }
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}