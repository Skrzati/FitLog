import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RegisterDto } from '../../core/models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html'
  // USUNIĘTO: styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  registerData: RegisterDto = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };

  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  onSubmit() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.register(this.registerData).subscribe({
      next: (user) => {
        console.log('Zarejestrowano:', user);
        this.isLoading.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Błąd rejestracji:', err);
        this.errorMessage.set('Błąd rejestracji. Spróbuj innej nazwy/emaila.');
        this.isLoading.set(false);
      }
    });
  }
}