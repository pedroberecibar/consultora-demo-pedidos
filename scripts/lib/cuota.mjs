// Decide si una automatización puede correr según la ventana de 5 h del proveedor (ADR-0002 y ADR-0005).
export function evaluarCuota(respuesta, proveedor, umbral = 80) {
  if (!['claude', 'codex'].includes(proveedor)) {
    throw new Error(`Proveedor no válido: "${proveedor}" (usar claude o codex).`);
  }
  if (!Number.isFinite(umbral) || umbral <= 0 || umbral > 100) {
    throw new Error(`Umbral no válido: ${umbral}.`);
  }
  const uso = respuesta?.result?.rateLimits?.[proveedor]?.session?.usedPercent;
  if (typeof uso !== 'number') {
    return { ok: false, mensaje: `Sin datos de uso para ${proveedor}: se saltea por precaución.` };
  }
  if (uso > umbral) {
    return { ok: false, mensaje: `${proveedor}: ventana de 5 h al ${uso} % (> ${umbral} %): se saltea.` };
  }
  return { ok: true, mensaje: `${proveedor}: ventana de 5 h al ${uso} % (≤ ${umbral} %): sigue.` };
}
