// Uso: node scripts/crear-labels.mjs [--repo owner/repo]
// Crea o actualiza los labels del ADR-0004. Se puede correr las veces que haga falta.
import { execFileSync } from 'node:child_process';
import { LABELS, argumentosGh } from './lib/labels.mjs';

const i = process.argv.indexOf('--repo');
const repo = i > -1 ? process.argv[i + 1] : undefined;
for (const label of LABELS) {
  execFileSync('gh', argumentosGh(label, repo), { stdio: 'inherit' });
  console.log(`✓ ${label.nombre}`);
}
