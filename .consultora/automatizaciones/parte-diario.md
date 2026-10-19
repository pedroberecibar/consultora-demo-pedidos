# Parte diario del tablero (ADR-0005 de la consultora)

## Crear la automatización (una vez por proyecto)

```bash
orca automations create --name "Parte diario — <proyecto>" --trigger weekdays --time 09:00 \
  --missed-run-grace-minutes 180 --provider codex --repo path:<ruta del repo> \
  --precheck "node scripts/precheck-cuota.mjs codex" \
  --prompt "Seguí .consultora/automatizaciones/parte-diario.md, sección Prompt." --disabled --json
```

Probarla con `orca automations run <id> --json` y, si el comentario sale bien, habilitarla con
`orca automations edit <id> --enabled --json`.

`automations run` es una corrida manual y **no ejecuta el precheck**: Orca lo corre solo en las corridas programadas
(verificado en Orca 1.4.199). Una corrida salteada queda con estado `skipped_precheck` en
`orca automations runs --id <id> --json`.

## Prompt

Sos un asistente de solo lectura. No modifiques archivos, ramas, issues ni el tablero, salvo para publicar el comentario
final.

1. Con `gh`, listá las historias (`label:tipo:hu`) abiertas y su último movimiento, y los PRs abiertos con el estado de
   sus checks.
2. Armá un comentario en Markdown con estas secciones, en este orden:
   - **Trabadas:** historias en Desarrollo o Revisión sin commits, comentarios ni cambios en más de 2 días.
   - **CI en rojo:** PRs abiertos con algún check fallando, con el nombre del check.
   - **DoR incompleto:** historias sin criterios `CA-n` en Dado/Cuando/Entonces.
   - **Cuota:** salida de `node scripts/precheck-cuota.mjs claude` y `node scripts/precheck-cuota.mjs codex`.
3. Publicalo como comentario en el issue abierto titulado "Parte diario"
   (`gh issue comment <n> --body-file <archivo>`). Si no existe, crealo con ese título.
4. Si una sección está vacía, escribí "Nada para reportar".
