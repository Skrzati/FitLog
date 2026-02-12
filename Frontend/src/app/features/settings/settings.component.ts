import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { SettingsService } from '../../core/settings/settings.service';
import { User } from '../../core/models/auth.model';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);
  public appSettings = inject(SettingsService);

  user = signal<User | null>(null);

  profileForm = { username: '' };
  passwordForm = { oldPassword: '', newPassword: '' };

  message = signal<string>('');
  isError = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  ngOnInit() {
    const currentUser = this.authService.currentUser();
    if (currentUser) {
      this.user.set(currentUser);
      this.profileForm.username = currentUser.username || '';
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  onUpdateUsername() {
    const currentUser = this.user();
    if (!currentUser || !currentUser.id) return;

    if (!this.profileForm.username.trim()) {
      this.showMsg('Nazwa użytkownika nie może być pusta.', true);
      return;
    }

    this.isLoading.set(true);

    this.userService.changeUsername(currentUser.id, this.profileForm.username).subscribe({
      next: () => {
        const updatedUser = { ...currentUser, username: this.profileForm.username };
        this.authService.currentUser.set(updatedUser);
        localStorage.setItem('loggedUser', JSON.stringify(updatedUser));
        
        this.showMsg('Nazwa użytkownika została zmieniona.', false);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.showMsg('Nie udało się zmienić nazwy.', true);
        this.isLoading.set(false);
      }
    });
  }

  onChangePassword() {
    const currentUser = this.user();
    if (!currentUser || !currentUser.id) return;

    // 1. Walidacja czy pola są wypełnione
    if (!this.passwordForm.oldPassword || !this.passwordForm.newPassword) {
      this.showMsg('Wypełnij wszystkie pola hasła.', true);
      return;
    }

    // 2. NOWOŚĆ: Walidacja długości hasła (zgodnie z Twoim backendem > 8 znaków)
    // Przyjmuję bezpiecznie min. 8 znaków (lub 9 jeśli "dłuższe niż 8" jest ścisłe)
    if (this.passwordForm.newPassword.length < 8) {
      this.showMsg('Nowe hasło musi mieć co najmniej 8 znaków.', true);
      return;
    }

    this.isLoading.set(true);

    this.userService.changePassword(
      currentUser.id,
      this.passwordForm.oldPassword,
      this.passwordForm.newPassword
    ).subscribe({
      next: () => {
        this.passwordForm = { oldPassword: '', newPassword: '' };
        this.showMsg('Hasło zostało zmienione pomyślnie.', false);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        // Backend może zwrócić błąd walidacji lub błędne stare hasło
        if (err.status === 400) {
            this.showMsg('Błąd walidacji: Sprawdź poprawność danych.', true);
        } else {
            this.showMsg('Błąd: Sprawdź czy stare hasło jest poprawne.', true);
        }
        this.isLoading.set(false);
      }
    });
  }

  private showMsg(text: string, error: boolean) {
    this.message.set(text);
    this.isError.set(error);
    setTimeout(() => this.message.set(''), 4000); // Wydłużyłem nieco czas wyświetlania
  }
}