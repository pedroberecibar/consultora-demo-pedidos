#!/usr/bin/env bash
# Uso: bash scripts/comandos-declarados.sh   (en la CI: >> "$GITHUB_OUTPUT")
# Imprime "declarados=si" si .consultora/comandos.env tiene al menos un comando obligatorio (FORMATO_CHECK, LINT o
# TESTS) y "declarados=no" si no tiene ninguno. Con "no", la CI saltea los pasos del proyecto: pasa durante la fase de
# Inicio, cuando el stack todavía no está decidido. Con uno cargado, los tres se exigen. Para la Puerta 2 tienen que
# estar completos.
set -euo pipefail
archivo="${COMANDOS_ENV:-.consultora/comandos.env}"
# shellcheck disable=SC1090
source <(tr -d '\r' < "$archivo")
if [[ -n "${FORMATO_CHECK:-}${LINT:-}${TESTS:-}" ]]; then
  echo "declarados=si"
else
  echo "declarados=no"
  echo "::warning::$archivo no tiene comandos: se saltean formato, linter, tipos y tests. Vale solo hasta la Puerta 2." >&2
fi
