---
name: lanzar-historia
description: Convierte una historia del tablero (issue HU-NN.M) en su grafo de tareas en Orca y lanza la primera ola de workers. Usala cuando el PM va a ejecutar una historia Refinada de la Iteración actual.
---

# Lanzar una historia (ADR-0005 de la consultora)

Argumento: número del issue de la historia. La skill fija el procedimiento; las specs las escribe el PM.

## 1. Leer la historia

```bash
gh issue view <N> --json number,title,body,labels,milestone,url
```

Verificá el DoR (ADR-0003): criterios `CA-n` en Dado/Cuando/Entonces, tamaño y riesgo cargados en el tablero, caso de
uso de origen. Si falta algo, **no lances**: devolvé la historia a Refinada y avisá a Pedro.

## 2. Decidir los nodos

| Nodo | Cuándo existe | Perfil |
|---|---|---|
| Diseño | La historia necesita contrato de interfaz, ADR o diagrama de secuencia | `arquitecto` (lo hace el PM) |
| Implementación | Siempre | `dev` |
| Tests de aceptación | Tamaño M o riesgo alto | `qa` |
| Revisión cruzada | Tamaño M, riesgo alto o cambios de CI/permisos | `revisor` |

## 3. Escribir las specs y crear las Tasks

Una spec por nodo con la plantilla del ADR-0003 (`Rol: .consultora/roles/<perfil>.md`, alcance según
`.consultora/roles-scope.yml`, criterios `CA-n` copiados del issue, entrega con `Refs #<N>`; el último PR de la
historia usa `Closes #<N>`).

```bash
orca orchestration run-create --objective "HU-NN.M <título> (#<N>)" --json
orca orchestration task-create --task-title "Implementación HU-NN.M" --spec "<spec>" --json
orca orchestration task-create --task-title "Aceptación HU-NN.M" --spec "<spec>" --json
orca orchestration task-create --task-title "Revisión HU-NN.M" --deps '["<id impl>","<id aceptación>"]' --spec "<spec>" --json
```

## 4. Chequear cuota y lanzar la primera ola

```bash
node scripts/precheck-cuota.mjs claude   # antes de lanzar workers de Claude
node scripts/precheck-cuota.mjs codex    # antes de lanzar workers de Codex
orca orchestration task-list --ready --brief --json
orca orchestration worker-start --task <id> --worktree new-top-level --repo path:<repo> \
  --name <tipo>/<N>-<slug> --agent claude --model sonnet --json   # dev
orca orchestration worker-start --task <id> --worktree new-top-level --repo path:<repo> \
  --name test/<N>-<slug> --agent codex --json                     # qa
orca worktree set --worktree branch:<rama> --issue <N> --json
```

Máximo 2 workers en paralelo. Si un precheck sale con código 1, no lances ese proveedor: esperá el reset o movés la
tarea al otro proveedor, y avisás a Pedro.

Orca puede crear la rama con un nombre propio (por ejemplo `pedroberecibar/tipo-slug`): si pasa, la spec le pide al
worker renombrarla con `git branch -m <tipo>/<N>-<slug>` antes del primer push.

## 5. Mover el Estado

Pasá la historia a **Diseño** (si hay nodo de diseño) o a **Desarrollo** en el tablero. Después seguí el bucle de
orquestación (`check --wait`, `reply`, `worker-release`, `check --ack`) y la checklist de `.consultora/roles/pm.md`.
