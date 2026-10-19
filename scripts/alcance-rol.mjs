// Uso: node scripts/alcance-rol.mjs <pr.json> [roles-scope.yml]
// pr.json = salida de `gh pr view <n> --json labels,files`. Sale con 1 si el PR toca archivos fuera de su rol.
import { readFileSync } from 'node:fs';
import { parsearRolesScope } from './lib/roles-scope.mjs';
import { rolDesdeLabels, archivosFueraDeAlcance } from './lib/alcance.mjs';

const [, , rutaPr, rutaScope = '.consultora/roles-scope.yml'] = process.argv;
try {
  const pr = JSON.parse(readFileSync(rutaPr, 'utf8'));
  const rol = rolDesdeLabels(pr.labels.map((l) => l.name));
  const scope = parsearRolesScope(readFileSync(rutaScope, 'utf8'));
  const fuera = archivosFueraDeAlcance(rol, pr.files.map((f) => f.path), scope);
  if (fuera.length > 0) {
    console.error(`El rol "${rol}" tocó archivos fuera de su alcance:`);
    fuera.forEach((f) => console.error(`  - ${f}`));
    process.exit(1);
  }
  console.log(`Alcance OK: ${pr.files.length} archivo(s) dentro del alcance de "${rol}".`);
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
