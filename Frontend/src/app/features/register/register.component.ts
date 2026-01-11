import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    // Tutaj dodajemy Username, żeby trafił do bazy
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordMatchValidator });

  errorMessage = '';

  onSubmit() {
    if (this.registerForm.valid) {
      // Wyciągamy dane bez confirmPassword
      const { confirmPassword, ...userData } = this.registerForm.getRawValue();
      
      // Rzutujemy na obiekt User
      const newUser: User = userData as User;

      this.authService.register(newUser).subscribe({
        next: () => {
          // Po sukcesie idziemy do logowania
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
          // Obsługa błędu (np. zajęty login)
          if (err.error && typeof err.error === 'string') {
            this.errorMessage = err.error;
          } else {
            this.errorMessage = 'Błąd rejestracji. Taki email lub nick może już istnieć.';
          }
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }
}