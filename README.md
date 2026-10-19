# <nombre del proyecto>

Proyecto creado desde la plantilla de la Consultora Virtual (versión en `.consultora/version`).

## Alta del proyecto

1. Crear el repo con **Use this template** y elegir la visibilidad.
2. Registrar el repo en Orca (`orca repo add --path <ruta>`) y completar `.consultora/comandos.env`.
3. **(Pedro, una vez)** `gh auth refresh -s project`.
4. Copiar el tablero: `gh project copy <número de "Plantilla de tablero"> --source-owner @me --target-owner @me
   --title "<proyecto>"` y vincularlo al repo. Crear los labels: `node scripts/crear-labels.mjs --repo <owner/repo>`.
5. **(Pedro, en la web)** En el tablero, activar las reglas: issue agregado → Backlog, cerrado → Hecha,
   reabierto → Desarrollo. En repos públicos: Settings → Environments → `production` con Pedro como aprobador.
   En repos privados con plan Free, borrar la línea `environment: production` de `release.yml` y `rollback.yml`.
6. Crear el parte diario (ver `.consultora/automatizaciones/parte-diario.md`).
7. Arrancar la fase de Inicio con `docs/requerimientos/vision.md`.
