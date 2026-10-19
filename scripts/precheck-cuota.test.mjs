import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('./precheck-cuota.mjs', import.meta.url));

function correr(contenido, ...args) {
  const archivo = join(mkdtempSync(join(tmpdir(), 'cuota-')), 'cuenta.json');
  writeFileSync(archivo, contenido);
  return spawnSync(process.execPath, [script, ...args], {
    encoding: 'utf8',
    env: { ...process.env, ORCA_ACCOUNT_JSON: archivo },
  });
}

const json = (uso) => JSON.stringify({ result: { rateLimits: { codex: { session: { usedPercent: uso } } } } });

test('sale con 0 si la cuota alcanza', () => {
  assert.equal(correr(json(10), 'codex').status, 0);
});

test('sale con 1 si la cuota supera el umbral', () => {
  const r = correr(json(95), 'codex');
  assert.equal(r.status, 1);
  assert.match(r.stdout, /se saltea/);
});

test('sale con 1 y explica si el JSON está roto', () => {
  const r = correr('{roto', 'codex');
  assert.equal(r.status, 1);
  assert.match(r.stderr, /No se pudo leer la cuota/);
});
