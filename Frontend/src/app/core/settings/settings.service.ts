// src/app/core/settings/settings.service.ts
import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  isDarkMode = signal<boolean>(true); 
  showUsername = signal<boolean>(false); 

  constructor() {
    // Ładowanie z localStorage
    if (typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      this.isDarkMode.set(savedTheme !== 'light'); // Jeśli nie 'light', to dark
    }

    // Ten efekt wykonuje się automatycznie przy zmianie sygnału
    effect(() => {
      if (typeof document !== 'undefined') {
        if (this.isDarkMode()) {
          document.body.classList.remove('light-theme');
          localStorage.setItem('theme', 'dark');
        } else {
          document.body.classList.add('light-theme'); // <-- To zmienia zmienne CSS
          localStorage.setItem('theme', 'light');
        }
      }
    });
  }

  toggleTheme() {
    this.isDarkMode.update(val => !val);
  }
  
  toggleGreeting() {
    this.showUsername.update(val => !val);
  }
}