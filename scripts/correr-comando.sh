#!/usr/bin/env bash
# Uso: bash scripts/correr-comando.sh NOMBRE [obligatorio|opcional]
# Ejecuta el comando NOMBRE de .consultora/comandos.env (ADR-0007, decisión 2).
set -euo pipefail
nombre="${1:?Falta el nombre del comando}"
modo="${2:-obligatorio}"
archivo="${COMANDOS_ENV:-.consultora/comandos.env}"
# shellcheck disable=SC1090
source <(tr -d '\r' < "$archivo")
comando="${!nombre:-}"
if [[ -z "$comando" ]]; then
  if [[ "$modo" == "obligatorio" ]]; then
    echo "::error::$nombre está vacío en $archivo y es obligatorio (ADR-0003 de la consultora)." >&2
    exit 1
  fi
  echo "::notice::$nombre está vacío en $archivo: se saltea."
  exit 0
fi
echo "▶ $nombre: $comando"
bash -c "$comando"
