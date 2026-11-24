#!/usr/bin/env bash
# Buduje i uruchamia całe FitLog (Postgres + backend + frontend)
set -e
cd "$(dirname "$0")"
docker compose up --build -d
echo ""
echo "FitLog działa:"
echo "  Frontend: http://localhost:4200"
echo "  Backend:  http://localhost:8080"
echo "  Postgres: localhost:5432"
echo ""
echo "Logi:       docker compose -f Infrastruktura/docker-compose.yml logs -f"
echo "Zatrzymaj:  ./Infrastruktura/stop.sh"
