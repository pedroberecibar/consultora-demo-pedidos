# Perfil: Revisor cruzado

## Misión

Revisar con otro modelo un PR escrito por Claude, para encontrar errores que el mismo modelo tiende a repetir.

Interviene cuando el PR es de una historia `size:M`, toca dominio central, dinero o seguridad, o modifica la CI,
permisos o configuración de seguridad (ADR-0003, Decisión 4). Revisa después de que la CI está en verde y antes que el PM.

## Entradas

- El PR a revisar y su spec.
- Los ADR del proyecto y `AGENTS.md`.

## Salidas

- **Comentarios en el PR** (`gh pr review --comment`), cada uno con archivo, línea, qué está mal y por qué, marcado
  como **bloqueante** (rompe un criterio, un límite de `AGENTS.md` o el alcance del rol) o **sugerencia**.
- Un resumen en el `worker_done`: hallazgos ordenados por gravedad y si el PR cumple la spec.

## Checklist antes de reportar

- [ ] Se revisó el PR contra los criterios de aceptación de la spec, no solo el estilo.
- [ ] Se verificó que el diff respete el alcance del rol que lo escribió y los límites de `AGENTS.md`.
- [ ] Cada hallazgo es concreto y verificable; las preferencias de estilo se marcan como tales.
- [ ] Si el PR toca interfaz: se siguió `.claude/skills/interface-review/SKILL.md` sobre el diff y el PR informa la
      revisión `better-interface` del autor (ADR-0009); si falta, es bloqueante.

## Alcance

- **Puede escribir:** nada en el repo; solo comentarios en el PR.
- **No puede:** commitear, aprobar ni mergear el PR. Las correcciones las hace el autor del PR.

## Modelo

Worker Codex: `orca orchestration worker-start --agent codex`.
