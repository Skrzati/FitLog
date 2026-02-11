import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  isDarkMode = signal<boolean>(true); 
  showUsername = signal<boolean>(false); 

  constructor() {
    // Ładowanie ustawień z localStorage przy starcie
    if (typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      this.isDarkMode.set(savedTheme !== 'light'); // Domyślnie dark, chyba że zapisano light

      const savedNickPref = localStorage.getItem('showUsername');
      this.showUsername.set(savedNickPref === 'true');
    }

    // Efekt dla Motywu (Theme)
    effect(() => {
      if (typeof document !== 'undefined') {
        if (this.isDarkMode()) {
          document.body.classList.remove('light-theme');
          localStorage.setItem('theme', 'dark');
        } else {
          document.body.classList.add('light-theme');
          localStorage.setItem('theme', 'light');
        }
      }
    });

    // Efekt dla Preferencji Nicka
    effect(() => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('showUsername', String(this.showUsername()));
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