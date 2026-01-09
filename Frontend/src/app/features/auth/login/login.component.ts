import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { User } from '../../../core/models/auth.model';

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

  // Formularz zbiera email i hasło
  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMessage = '';

  onSubmit() {
    if (this.loginForm.valid) {
      this.errorMessage = '';
      
      // Pobieramy dane z formularza
      const formValues = this.loginForm.getRawValue();

      // Rzutujemy na typ User, aby pasował do metody login()
      const userPayload: User = {
        email: formValues.email,
        password: formValues.password
      };

      this.authService.login(userPayload).subscribe({
        next: (user) => {
          console.log('Zalogowano pomyślnie:', user);
          this.router.navigate(['/dashboard']); 
        },
        error: (err) => {
          console.error('Błąd logowania:', err);
          // Jeśli backend zwróci tekst "Błędny login lub hasło", wyświetlimy go
          if (typeof err.error === 'string') {
            this.errorMessage = err.error; 
          } else {
            this.errorMessage = 'Wystąpił błąd połączenia z serwerem.';
          }
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}