import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parsearRolesScope } from './roles-scope.mjs';

test('lee roles con listas, lista vacía, comillas y comentarios', () => {
  const r = parsearRolesScope('# comentario\ndev:\n  - src/**\n  - "tests/unit/**"\nrevisor: []\n');
  assert.deepEqual(r, { dev: ['src/**', 'tests/unit/**'], revisor: [] });
});

test('acepta finales de línea CRLF', () => {
  assert.deepEqual(parsearRolesScope('qa:\r\n  - tests/acceptance/**\r\n'), { qa: ['tests/acceptance/**'] });
});

test('rechaza una línea no válida indicando el número', () => {
  assert.throws(() => parsearRolesScope('dev:\n  src/**\n'), /línea 2/);
});

test('rechaza un ítem antes de cualquier rol', () => {
  assert.throws(() => parsearRolesScope('  - src/**\n'), /línea 1/);
});

test('el roles-scope.yml de la plantilla define los 7 roles', () => {
  const texto = readFileSync(new URL('../../.consultora/roles-scope.yml', import.meta.url), 'utf8');
  assert.deepEqual(Object.keys(parsearRolesScope(texto)).sort(),
    ['analista', 'arquitecto', 'dev', 'devops', 'pm', 'qa', 'revisor']);
});
