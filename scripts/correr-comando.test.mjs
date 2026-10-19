import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('./correr-comando.sh', import.meta.url));

function correr(env, ...args) {
  const archivo = join(mkdtempSync(join(tmpdir(), 'comandos-')), 'comandos.env');
  writeFileSync(archivo, env);
  return spawnSync('bash', [script, ...args], { encoding: 'utf8', env: { ...process.env, COMANDOS_ENV: archivo } });
}

test('ejecuta el comando declarado', () => {
  const r = correr('TESTS="echo hola"\n', 'TESTS');
  assert.equal(r.status, 0);
  assert.match(r.stdout, /hola/);
});

test('propaga el error del comando', () => {
  assert.equal(correr('LINT="exit 3"\n', 'LINT').status, 3);
});

test('un obligatorio vacío falla', () => {
  const r = correr('TESTS=""\n', 'TESTS');
  assert.equal(r.status, 1);
  assert.match(r.stderr, /obligatorio/);
});

test('un opcional vacío se saltea', () => {
  const r = correr('TIPOS=""\n', 'TIPOS', 'opcional');
  assert.equal(r.status, 0);
  assert.match(r.stdout, /se saltea/);
});

test('acepta comandos.env con CRLF', () => {
  const r = correr('TESTS="echo crlf"\r\n', 'TESTS');
  assert.equal(r.status, 0);
  assert.match(r.stdout, /crlf/);
});
