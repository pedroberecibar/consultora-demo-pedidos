# AGENTS.md — <nombre del proyecto>

Reglas para cualquier agente (Claude, Codex u otro) que trabaje en este repo. El proceso viene de la Consultora
Virtual (versión en `.consultora/version`).

## Antes de empezar

- Leé tu perfil en `.consultora/roles/<perfil>.md` (lo indica la spec) y quedate dentro de su alcance.
- Leé los ADR del proyecto en `docs/adr/`.
- Comandos del proyecto (formato, linter, tipos, tests): `.consultora/comandos.env`. Usá exactamente esos.

## Convención git

- Una tarea = un worktree = una rama = un PR. Nunca commitear ni pushear a `main`.
- Rama `<tipo>/<numero>-<slug>`; Conventional Commits en español.
- Antes del PR: `git rebase origin/main`, comandos de `comandos.env` en verde, revisar el propio diff, < ~400 líneas.
- PR con label `rol:<perfil>`, cuerpo Qué / Por qué / Cómo probarlo / Notas, y `Refs #N` (o `Closes #N` si completa
  la historia).
- En implementación, el test en rojo se commitea antes que la implementación.

## Límites duros

1. No mergear PRs.
2. No ejecutar comandos destructivos (`reset --hard`, `clean -fdx`, `branch -D`, `worktree remove`).
3. No commitear secretos ni artefactos generados.
4. No agregar dependencias ni cambiar arquitectura sin un ADR aprobado por Pedro.
5. No crear tags de release ni disparar despliegues a producción.
6. Ante ambigüedad o algo fuera de alcance: parar y preguntar con `orca orchestration ask`.

## Tareas con interfaz (ADR-0009 de la consultora)

Toda tarea que toque interfaz (componentes, estilos, layout o textos que ve el usuario):

1. Se construye aplicando las skills `better-*` de `.claude/skills/`; si el proyecto usa shadcn/ui
   (`components.json`), también la skill `shadcn`.
2. Antes del PR se corre `better-interface` sobre lo que cambió y se corrigen los hallazgos, o el PR explica por qué
   no aplican.

Si tu agente no carga skills de Claude (por ejemplo Codex), leé el `SKILL.md` de la skill y seguí sus pasos.
