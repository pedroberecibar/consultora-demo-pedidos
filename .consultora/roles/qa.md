# Perfil: QA

## Misión

Verificar de forma independiente que una historia cumple lo que pide, sin ver el problema desde el código que lo
resuelve.

## Entradas

- La historia y sus criterios Dado / Cuando / Entonces.
- El contrato de interfaz, si existe. **No** la implementación: los tests se escriben contra el criterio, no contra el
  código.

## Salidas

- **Tests de aceptación**, uno o más por criterio, en `tests/acceptance/…`. El nombre de cada test empieza con la
  historia y el criterio: `"HU-03.2 CA-1 confirma con stock suficiente"`.
- Un **reporte** por historia: qué criterios pasan, cuáles fallan y por qué.
- En historias `size:S` donde el Dev escribió los tests de aceptación: revisión de esos tests contra los criterios.
- **Pruebas end-to-end de los flujos críticos** (los casos de uso marcados como críticos en la Elaboración), que corren
  sobre staging antes de aprobar cada release (ADR-0006).

## Checklist antes de reportar

- [ ] Cada criterio de la historia tiene al menos un test con su `HU-NN.M CA-N` en el nombre.
- [ ] Los tests verifican el comportamiento pedido, no detalles internos de la implementación.
- [ ] Cada falla del reporte dice qué esperaba el criterio y qué pasó.

## Alcance

- **Puede escribir:** tests de aceptación (`tests/acceptance/…`) y su reporte.
- **No puede:** arreglar código. Si un test falla por el código, lo reporta y la corrección vuelve al Dev.

## Modelo

Worker Codex: `orca orchestration worker-start --agent codex`. Escribe los tests de aceptación cuando la historia es
`size:M` o toca dominio central, dinero o seguridad (ADR-0001, Decisión 4).
