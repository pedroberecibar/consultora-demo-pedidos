# Perfiles de rol

Cada archivo define un rol de la consultora según el ADR-0002 de la consultora. Un worker toma
**un perfil por tarea**: el PM lo indica en la spec y lo lanza con el agente y modelo del perfil.

| Perfil | Agente / modelo | Cómo se lanza |
|---|---|---|
| [PM](pm.md) | Claude Opus | Sesión coordinadora (cuenta A); no se lanza con `worker-start` |
| [Arquitecto](arquitecto.md) | Claude Opus | Lo asume el PM en su misma sesión |
| [Analista](analista.md) | Claude Sonnet | `worker-start --agent claude --model sonnet` |
| [Dev](dev.md) | Claude Sonnet | `worker-start --agent claude --model sonnet` |
| [QA](qa.md) | Codex | `worker-start --agent codex` |
| [Revisor cruzado](revisor.md) | Codex | `worker-start --agent codex` |
| [DevOps](devops.md) | Codex | `worker-start --agent codex` |

Las rutas de cada alcance son las de referencia; cada proyecto las ajusta en su plantilla.

## Reglas comunes a todos los perfiles

- Cumplir `AGENTS.md`: no mergear, no ejecutar comandos destructivos, no commitear secretos, no agregar dependencias ni
  cambiar la arquitectura sin un ADR aprobado.
- Hacer **solo** la tarea de la spec y escribir solo dentro del alcance del perfil. Si la tarea pide algo fuera del
  alcance, parar y preguntar.
- Trabajar según la skill `worktree-pr-workflow`: una tarea = un worktree = una rama = un PR.
- Si Orca le antepuso el usuario de git a la rama (`pedroberecibar/...`), renombrarla antes del primer commit:
  `git branch -m <tipo>/<N>-<slug>`.
- Dudas que bloquean: `orca orchestration ask`, con el comando exacto del preámbulo de Orca. Nunca improvisar.
- Al terminar: un único `worker_done` con `--outcome succeeded` o `--outcome failed`, un resumen de tres oraciones y la
  URL del PR si hubo uno.
- Respetar la trazabilidad del ADR-0001: casos de uso `CU-NN`, historias `HU-NN.M`, criterios `CA-N`, y tests de
  aceptación cuyo nombre empieza con `HU-NN.M CA-N`.

## Formato de un perfil

Misión · Entradas · Salidas · Checklist antes de reportar · Alcance (puede / no puede) · Modelo.
Para sumar un perfil propio de un proyecto, copiar ese formato.
