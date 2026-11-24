# FitLog 🏋️‍♂️🏃‍♀️

> ⚠️ **Uwaga:** Projekt jest w fazie rozwoju (**Work in Progress - WIP**).

Kompleksowa aplikacja webowa do śledzenia aktywności fizycznej. Umożliwia rejestrowanie treningów siłowych i cardio, monitorowanie kalorii oraz analizę postępów.

## 🚀 Technologie
* **Backend:** Java 25, Spring Boot 4 (Web, Data JPA, Security, Validation), Gradle
* **Baza danych:** PostgreSQL 18
* **Frontend:** Angular 22, TypeScript, SCSS (jasny/ciemny motyw), Vitest
* **Infrastruktura:** Docker, Docker Compose, Nginx

## ✨ Funkcjonalności
* **Zarządzanie kontem:** Rejestracja, logowanie, zmiana danych i hasła.
* **Treningi:**
  * **Cardio:** Czas, dystans, kalorie, tętno, tempo, kadencja.
  * **Siłownia:** Ćwiczenia, serie, powtórzenia, ciężar.
* **Dashboard:** Graficzne podsumowanie aktywności z ostatnich 7 dni (czas, kalorie).
* **Ustawienia:** Personalizacja motywu i widoczności nazwy użytkownika.

## 📁 Struktura projektu
```
FitLog/
├── Backend/FitLog/        # Spring Boot (API)
├── Frontend/              # Angular (UI)
└── Infrastruktura/        # Docker: compose, Dockerfile'e, skrypty start/stop
    ├── docker-compose.yml
    ├── backend/Dockerfile
    ├── frontend/Dockerfile + nginx.conf
    ├── .env.example
    ├── start.sh
    └── stop.sh
```

## 🐳 Uruchomienie w Dockerze (zalecane)
Wymagany jest tylko [Docker](https://www.docker.com/) – Java i Node nie są potrzebne.

```bash
./Infrastruktura/start.sh
```

| Usługa     | Adres                   |
|------------|-------------------------|
| Frontend   | http://localhost:4200   |
| Backend    | http://localhost:8080   |
| PostgreSQL | localhost:5432          |

Przydatne komendy:
```bash
./Infrastruktura/stop.sh                                   # zatrzymanie (dane zostają)
./Infrastruktura/stop.sh -v                                # zatrzymanie + usunięcie danych bazy
docker compose -f Infrastruktura/docker-compose.yml logs -f # logi wszystkich usług
```

### Konfiguracja bazy (`.env`)
Domyślne dane dostępowe to `fitlog` / `fitlog` (baza `fitlog`). Aby je zmienić:
```bash
cp Infrastruktura/.env.example Infrastruktura/.env
```
i edytuj wartości w `Infrastruktura/.env`. Plik `.env` jest w `.gitignore` – nie trafia do repozytorium.

## 🛠️ Uruchomienie lokalne (development)
Wymagania: Java 25, Node.js 22+, Docker (dla bazy).

### 1. Baza danych
```bash
docker compose -f Infrastruktura/docker-compose.yml up -d db
```

### 2. Backend (Spring Boot)
```bash
cd Backend/FitLog
./gradlew bootRun        # Linux/Mac
gradlew.bat bootRun      # Windows
```
Serwer działa na porcie **8080** i łączy się z bazą na `localhost:5432`.
Połączenie można nadpisać zmiennymi środowiskowymi: `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`.
Tabele tworzą się i aktualizują automatycznie (`spring.jpa.hibernate.ddl-auto=update`).

### 3. Frontend (Angular)
```bash
cd Frontend
npm install
npm start
```
Aplikacja działa pod adresem http://localhost:4200

> Jeśli uruchamiasz backend lokalnie, a reszta działa w Dockerze, najpierw zatrzymaj kontener backendu:
> `docker compose -f Infrastruktura/docker-compose.yml stop backend` (port 8080 będzie zajęty).

## 📝 Plany (Roadmap)
- [ ] Moduł Diety (kalkulator kalorii/makro)
- [x] Baza danych PostgreSQL
- [x] Uruchamianie w Dockerze
- [ ] Autoryzacja JWT dla Spring Security
- [ ] Zaawansowane statystyki progresu siłowego
