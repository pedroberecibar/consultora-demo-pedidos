# Origen de las skills externas

Copias versionadas de skills de terceros (ADR-0009). No se editan acá: si hace falta un cambio propio, se
discute en un ADR.

| Skills | Repo | Commit | Fecha | Licencia |
|---|---|---|---|---|
| `better-accessibility`, `better-colors`, `better-interface`, `better-layout`, `better-typography`, `better-ui`, `better-writing`, `break`, `build-design`, `explain-interface`, `interface-review`, `state-machine`, `variant` | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) | `4c66b1f` | 2026-10-12 | MIT |
| `shadcn` (sin `evals/`) | [shadcn-ui/ui](https://github.com/shadcn-ui/ui), carpeta `skills/shadcn` | `d2fba50` | 2026-10-16 | MIT |

Cada carpeta lleva el archivo de licencia de su repo.

## Cómo actualizarlas

1. Clonar el repo de origen en una carpeta temporal.
2. Reemplazar las carpetas de la tabla por las nuevas (sin `technical-drawing` ni `evals/`) y volver a copiar la licencia.
3. Revisar el diff completo: comandos que se ejecutan al cargar (`` !`...` `` en un `SKILL.md`), `allowed-tools`,
   scripts y descargas.
4. Actualizar commit y fecha en esta tabla y abrir un PR.
