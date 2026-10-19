import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rolDesdeLabels, archivosFueraDeAlcance } from './alcance.mjs';

const scope = { dev: ['src/**', 'tests/unit/**'], revisor: [] };

test('devuelve el único rol de los labels', () => {
  assert.equal(rolDesdeLabels(['tipo:hu', 'rol:dev']), 'dev');
});

test('falla sin label de rol', () => {
  assert.throws(() => rolDesdeLabels(['tipo:hu']), /no tiene label rol/);
});

test('falla con dos labels de rol', () => {
  assert.throws(() => rolDesdeLabels(['rol:dev', 'rol:qa']), /más de un label de rol/);
});

test('lista solo los archivos fuera del alcance', () => {
  assert.deepEqual(
    archivosFueraDeAlcance('dev', ['src/a.ts', 'tests/acceptance/x.test.ts'], scope),
    ['tests/acceptance/x.test.ts'],
  );
});

test('el revisor no puede tocar nada', () => {
  assert.deepEqual(archivosFueraDeAlcance('revisor', ['src/a.ts'], scope), ['src/a.ts']);
});

test('falla si el rol no está en roles-scope', () => {
  assert.throws(() => archivosFueraDeAlcance('ux', ['a.md'], scope), /no está definido/);
});
