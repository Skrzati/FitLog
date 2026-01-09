import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importujemy serwis z folderu core
import { SettingsService } from '../../core/settings/settings.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.component.html', // Szuka pliku html w TYM SAMYM folderze
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  public settingsService = inject(SettingsService);
}