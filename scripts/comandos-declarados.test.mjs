import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('./comandos-declarados.sh', import.meta.url));

function correr(env) {
  const archivo = join(mkdtempSync(join(tmpdir(), 'comandos-')), 'comandos.env');
  writeFileSync(archivo, env);
  return spawnSync('bash', [script], { encoding: 'utf8', env: { ...process.env, COMANDOS_ENV: archivo } });
}

test('sin comandos obligatorios responde "no" y avisa que se saltean los pasos', () => {
  const r = correr('INSTALAR="npm ci"\nFORMATO_CHECK=""\nLINT=""\nTESTS=""\n');
  assert.equal(r.status, 0);
  assert.match(r.stdout, /^declarados=no$/m);
  assert.match(r.stderr, /::warning::.*se saltean/);
});

test('con un solo obligatorio cargado responde "si": los demás se exigen', () => {
  const r = correr('FORMATO_CHECK=""\nLINT=""\nTESTS="npm test"\n');
  assert.equal(r.status, 0);
  assert.match(r.stdout, /^declarados=si$/m);
  assert.doesNotMatch(r.stderr, /::warning::/);
});

test('el comandos.env vacío de la plantilla responde "no"', () => {
  const archivo = fileURLToPath(new URL('../.consultora/comandos.env', import.meta.url));
  const r = spawnSync('bash', [script], { encoding: 'utf8', env: { ...process.env, COMANDOS_ENV: archivo } });
  assert.match(r.stdout, /^declarados=no$/m);
});

test('acepta comandos.env con CRLF', () => {
  assert.match(correr('LINT="npx eslint ."\r\n').stdout, /^declarados=si$/m);
});
