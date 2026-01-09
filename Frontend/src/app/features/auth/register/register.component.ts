import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { User } from '../../../core/models/auth.model';

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
    firstName: ['', Validators.required], // Ważne: nazwa pola zgodna z Java
    lastName: ['', Validators.required],  // Ważne: nazwa pola zgodna z Java
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordMatchValidator });

  errorMessage = '';

  onSubmit() {
    if (this.registerForm.valid) {
      // Pobieramy dane i oddzielamy confirmPassword (nie wysyłamy go do backendu)
      const { confirmPassword, ...userData } = this.registerForm.getRawValue();
      
      // Rzutujemy na User
      const newUser: User = userData as User;

      this.authService.register(newUser).subscribe({
        next: (user) => {
          console.log('Zarejestrowano:', user);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Błąd rejestracji. Sprawdź czy email nie jest już zajęty.';
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  // Walidator sprawdzający czy hasła są takie same
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }
}