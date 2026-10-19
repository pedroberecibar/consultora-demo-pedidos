// Uso: node scripts/precheck-cuota.mjs <claude|codex> [umbral]
// Para `orca automations create --precheck`: sale con 0 si la corrida puede seguir y con 1 si se saltea.
// Si no puede leer la cuota (Orca cerrado, JSON roto), se saltea: ante la duda, no se gasta cuota.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { evaluarCuota } from './lib/cuota.mjs';

const [, , proveedor, umbralTexto = '80'] = process.argv;
try {
  const json = process.env.ORCA_ACCOUNT_JSON
    ? readFileSync(process.env.ORCA_ACCOUNT_JSON, 'utf8')
    : execFileSync('orca', ['account', 'list', '--json'], { encoding: 'utf8' });
  const r = evaluarCuota(JSON.parse(json), proveedor, Number(umbralTexto));
  console.log(r.mensaje);
  process.exit(r.ok ? 0 : 1);
} catch (e) {
  console.error(`No se pudo leer la cuota: ${e.message}`);
  process.exit(1);
}
