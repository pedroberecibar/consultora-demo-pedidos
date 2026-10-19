import { test } from 'node:test';
import assert from 'node:assert/strict';
import { coincide } from './glob.mjs';

test('** al final coincide con cualquier profundidad', () => {
  assert.ok(coincide('src/a.ts', ['src/**']));
  assert.ok(coincide('src/a/b/c.ts', ['src/**']));
  assert.ok(!coincide('srcx/a.ts', ['src/**']));
});

test('**/ al principio coincide con cero o más carpetas', () => {
  assert.ok(coincide('README.md', ['**/*.md']));
  assert.ok(coincide('docs/a/b.md', ['**/*.md']));
});

test('* no cruza carpetas', () => {
  assert.ok(coincide('notas.md', ['*.md']));
  assert.ok(!coincide('docs/notas.md', ['*.md']));
});

test('los puntos son literales y ? es un solo carácter', () => {
  assert.ok(coincide('.github/workflows/ci.yml', ['.github/workflows/*.yml']));
  assert.ok(!coincide('xgithub/workflows/ci.yml', ['.github/workflows/*.yml']));
  assert.ok(coincide('v1.md', ['v?.md']));
  assert.ok(!coincide('v10.md', ['v?.md']));
});

test('ruta exacta y lista vacía', () => {
  assert.ok(coincide('package.json', ['package.json']));
  assert.ok(!coincide('a/package.json', ['package.json']));
  assert.ok(!coincide('src/a.ts', []));
});
