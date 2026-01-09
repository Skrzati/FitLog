import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  // Domyślne wartości (true = Ciemny motyw, false = Pokaż Imię)
  isDarkMode = signal<boolean>(true); 
  showUsername = signal<boolean>(false); 

  constructor() {
    // 1. Przy starcie ładujemy zapisane ustawienia z localStorage
    const savedTheme = localStorage.getItem('theme');
    const savedGreeting = localStorage.getItem('showUsername');

    if (savedTheme === 'light') {
      this.isDarkMode.set(false);
    }

    if (savedGreeting === 'true') {
      this.showUsername.set(true);
    }

    // 2. Efekt: Gdy zmieni się sygnał isDarkMode, automatycznie podmieniamy klasę w <body>
    effect(() => {
      if (this.isDarkMode()) {
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
      }
    });

    // 3. Efekt: Zapisujemy preferencję powitania
    effect(() => {
      localStorage.setItem('showUsername', String(this.showUsername()));
    });
  }

  toggleTheme() {
    this.isDarkMode.update(val => !val);
  }

  toggleGreeting() {
    this.showUsername.update(val => !val);
  }
}