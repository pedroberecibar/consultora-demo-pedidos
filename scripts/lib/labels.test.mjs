import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { LABELS, argumentosGh } from './labels.mjs';
import { parsearRolesScope } from './roles-scope.mjs';

const nombres = LABELS.map((l) => l.nombre);

test('incluye los labels de tipo y de decisión del ADR-0004', () => {
  for (const n of ['tipo:cu', 'tipo:hu', 'tipo:tecnica', 'needs-pedro', 'needs-confidentiality-review']) {
    assert.ok(nombres.includes(n), n);
  }
});

test('hay un label rol:<perfil> por cada rol de roles-scope.yml', () => {
  const texto = readFileSync(new URL('../../.consultora/roles-scope.yml', import.meta.url), 'utf8');
  for (const rol of Object.keys(parsearRolesScope(texto))) assert.ok(nombres.includes(`rol:${rol}`), rol);
});

test('los colores son hexadecimales de 6 dígitos y no hay nombres repetidos', () => {
  assert.ok(LABELS.every((l) => /^[0-9a-f]{6}$/.test(l.color)));
  assert.equal(new Set(nombres).size, nombres.length);
});

test('arma los argumentos de gh, con y sin repo', () => {
  const l = { nombre: 'tipo:cu', color: '5319e7', descripcion: 'Caso de uso' };
  assert.deepEqual(argumentosGh(l),
    ['label', 'create', 'tipo:cu', '--color', '5319e7', '--description', 'Caso de uso', '--force']);
  assert.deepEqual(argumentosGh(l, 'yo/repo').slice(-2), ['--repo', 'yo/repo']);
});
