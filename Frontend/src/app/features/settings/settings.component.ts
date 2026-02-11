import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // <--- IMPORT
import { AuthService } from '../../core/services/auth.service';
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
  private router = inject(Router); // <--- INJECT
  public appSettings = inject(SettingsService);

  user = signal<User | null>(null);

  // Formularze
  profileForm = { username: '', email: '', firstName: '' };
  passwordForm = { oldPassword: '', newPassword: '' };

  // Powiadomienia
  message = signal<string>('');
  isError = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  ngOnInit() {
    const currentUser = this.authService.currentUser();
    if (currentUser) {
      this.user.set(currentUser);
      this.profileForm.username = currentUser.username || '';
      this.profileForm.email = currentUser.email || '';
      this.profileForm.firstName = currentUser.firstName || '';
    }
  }

  // --- NOWA METODA ---
  goBack() {
    this.router.navigate(['/dashboard']);
  }

  // Symulacja aktualizacji profilu
  onUpdateProfile() {
    this.isLoading.set(true);
    
    setTimeout(() => {
      const updatedUser = { ...this.user()!, ...this.profileForm };
      this.authService.currentUser.set(updatedUser);
      localStorage.setItem('loggedUser', JSON.stringify(updatedUser));

      this.showMsg('Profil został zaktualizowany (lokalnie).', false);
      this.isLoading.set(false);
    }, 800);
  }

  // Symulacja zmiany hasła
  onChangePassword() {
    if (!this.passwordForm.oldPassword || !this.passwordForm.newPassword) {
      this.showMsg('Wypełnij wszystkie pola hasła.', true);
      return;
    }

    this.isLoading.set(true);

    setTimeout(() => {
      this.passwordForm = { oldPassword: '', newPassword: '' };
      this.showMsg('Hasło zostało zmienione pomyślnie.', false);
      this.isLoading.set(false);
    }, 1000);
  }

  private showMsg(text: string, error: boolean) {
    this.message.set(text);
    this.isError.set(error);
    setTimeout(() => this.message.set(''), 3000);
  }
}