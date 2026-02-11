import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html'
  // USUNIĘTO: styleUrls: ['./login.component.scss'] - korzystamy z globalnych stylów
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  // Obiekt formularza
  loginForm = {
    identifier: '', 
    password: ''
  };

  onSubmit() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    const isEmail = this.loginForm.identifier.includes('@');

    const loginData: User = {
      username: !isEmail ? this.loginForm.identifier : '', 
      email: isEmail ? this.loginForm.identifier : '',
      password: this.loginForm.password
    };

    this.authService.login(loginData).subscribe({
      next: (user) => {
        console.log('Zalogowano:', user);
        this.isLoading.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Błąd logowania:', err);
        this.errorMessage.set('Nieprawidłowa nazwa użytkownika lub hasło.');
        this.isLoading.set(false);
      }
    });
  }
}