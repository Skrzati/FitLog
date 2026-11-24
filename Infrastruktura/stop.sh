#!/usr/bin/env bash
# Zatrzymuje FitLog (dane w bazie zostają; dodaj -v żeby je usunąć)
set -e
cd "$(dirname "$0")"
docker compose down "$@"
