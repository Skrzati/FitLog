import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { SettingsService } from '../../core/settings/settings.service';
import { User } from '../../core/models/auth.model';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html'
  // USUNIĘTO: styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  
  public appSettings = inject(SettingsService);

  user = signal<User | null>(null);

  profileForm = { username: '', email: '' };
  passwordForm = { oldPassword: '', newPassword: '' };

  message = signal<string>('');
  isError = signal<boolean>(false);

  ngOnInit() {
    const currentUser = this.authService.currentUser();
    if (currentUser) {
      this.user.set(currentUser);
      this.profileForm.username = currentUser.username || '';
      this.profileForm.email = currentUser.email || '';
    }
  }

  onUpdateProfile() {
    const u = this.user();
    if (!u || !u.id) return;

    this.userService.updateProfile(u.id, this.profileForm).subscribe({
      next: (updatedUser) => {
        this.authService.currentUser.set(updatedUser);
        localStorage.setItem('loggedUser', JSON.stringify(updatedUser));
        this.showMsg('Profil zaktualizowany pomyślnie!', false);
      },
      error: () => this.showMsg('Błąd aktualizacji (brak backendu?)', true)
    });
  }

  onChangePassword() {
    const u = this.user();
    if (!u || !u.id) return;

    if (!this.passwordForm.oldPassword || !this.passwordForm.newPassword) {
      this.showMsg('Wypełnij oba pola hasła.', true);
      return;
    }

    this.userService.changePassword(u.id, this.passwordForm).subscribe({
      next: () => {
        this.passwordForm = { oldPassword: '', newPassword: '' };
        this.showMsg('Hasło zostało zmienione.', false);
      },
      error: () => this.showMsg('Błąd zmiany hasła.', true)
    });
  }

  private showMsg(text: string, error: boolean) {
    this.message.set(text);
    this.isError.set(error);
    setTimeout(() => this.message.set(''), 3000);
  }
}