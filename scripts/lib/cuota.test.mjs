import { test } from 'node:test';
import assert from 'node:assert/strict';
import { evaluarCuota } from './cuota.mjs';

const resp = (claude, codex) => ({
  result: { rateLimits: { claude: { session: { usedPercent: claude } }, codex: { session: { usedPercent: codex } } } },
});

test('sigue por debajo del umbral', () => {
  assert.equal(evaluarCuota(resp(12, 0), 'claude').ok, true);
});

test('80 % exacto todavía sigue: el ADR-0002 dice "supera"', () => {
  assert.equal(evaluarCuota(resp(80, 0), 'claude').ok, true);
});

test('81 % se saltea', () => {
  const r = evaluarCuota(resp(81, 0), 'claude');
  assert.equal(r.ok, false);
  assert.match(r.mensaje, /se saltea/);
});

test('mira el proveedor pedido', () => {
  assert.equal(evaluarCuota(resp(95, 10), 'codex').ok, true);
});

test('sin datos de uso se saltea por precaución', () => {
  const r = evaluarCuota({ result: { rateLimits: {} } }, 'codex');
  assert.equal(r.ok, false);
  assert.match(r.mensaje, /Sin datos/);
});

test('acepta un umbral propio', () => {
  assert.equal(evaluarCuota(resp(60, 0), 'claude', 50).ok, false);
});

test('rechaza proveedor o umbral no válidos', () => {
  assert.throws(() => evaluarCuota(resp(1, 1), 'gemini'), /Proveedor no válido/);
  assert.throws(() => evaluarCuota(resp(1, 1), 'claude', 0), /Umbral no válido/);
  assert.throws(() => evaluarCuota(resp(1, 1), 'claude', Number('x')), /Umbral no válido/);
});
