# FitLog 🏋️‍♂️🏃‍♀️

> ⚠️ **Uwaga:** Projekt jest w fazie rozwoju (**Work in Progress - WIP**). 

Kompleksowa aplikacja webowa do śledzenia aktywności fizycznej. Umożliwia rejestrowanie treningów siłowych i cardio, monitorowanie kalorii oraz analizę postępów.

## 🚀 Technologie
* **Backend:** Java, Spring Boot (Web, Data JPA, Security), H2 Database, Gradle
* **Frontend:** Angular 21, TypeScript, SCSS (jasny/ciemny motyw)

## ✨ Funkcjonalności
* **Zarządzanie kontem:** Rejestracja, logowanie, zmiana danych i hasła.
* **Treningi:**
  * **Cardio:** Czas, dystans, kalorie, tętno, tempo, kadencja.
  * **Siłownia:** Ćwiczenia, serie, powtórzenia, ciężar.
* **Dashboard:** Graficzne podsumowanie aktywności z ostatnich 7 dni (czas, kalorie).
* **Ustawienia:** Personalizacja motywu i widoczności nazwy użytkownika.

## 🛠️ Uruchomienie lokalne

### Backend (Spring Boot)
1. `cd Backend/FitLog`
2. `./gradlew bootRun` (Linux/Mac) lub `gradlew.bat bootRun` (Windows)
*Serwer działa na porcie 8080.*

### Frontend (Angular)
1. `cd Frontend`
2. `npm install`
3. `ng serve`
*Aplikacja działa pod adresem http://localhost:4200/*

## 📝 Plany (Roadmap)
- [ ] Moduł Diety (kalkulator kalorii/makro)
- [ ] Baza danych PostgreSQL/MySQL
- [ ] Autoryzacja JWT dla Spring Security
- [ ] Zaawansowane statystyki progresu siłowego
