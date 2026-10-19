import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('./alcance-rol.mjs', import.meta.url));
const scope = 'dev:\n  - src/**\n';

function correr(pr) {
  const dir = mkdtempSync(join(tmpdir(), 'alcance-'));
  writeFileSync(join(dir, 'pr.json'), JSON.stringify(pr));
  writeFileSync(join(dir, 'scope.yml'), scope);
  return spawnSync(process.execPath, [script, join(dir, 'pr.json'), join(dir, 'scope.yml')], { encoding: 'utf8' });
}

test('sale con 0 si todo está en alcance', () => {
  const r = correr({ labels: [{ name: 'rol:dev' }], files: [{ path: 'src/a.ts' }] });
  assert.equal(r.status, 0);
  assert.match(r.stdout, /Alcance OK/);
});

test('sale con 1 y lista los archivos fuera de alcance', () => {
  const r = correr({ labels: [{ name: 'rol:dev' }], files: [{ path: 'src/a.ts' }, { path: '.github/x.yml' }] });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /\.github\/x\.yml/);
});

test('sale con 1 si falta el label de rol', () => {
  const r = correr({ labels: [], files: [{ path: 'src/a.ts' }] });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /no tiene label rol/);
});
