import { coincide } from './glob.mjs';

export function rolDesdeLabels(labels) {
  const roles = labels.filter((l) => l.startsWith('rol:')).map((l) => l.slice(4));
  if (roles.length === 0) throw new Error('El PR no tiene label rol:<perfil> (ADR-0003 de la consultora).');
  if (roles.length > 1) throw new Error(`El PR tiene más de un label de rol: ${roles.join(', ')}.`);
  return roles[0];
}

export function archivosFueraDeAlcance(rol, archivos, scope) {
  if (!Object.hasOwn(scope, rol)) {
    throw new Error(`El rol "${rol}" no está definido en .consultora/roles-scope.yml.`);
  }
  return archivos.filter((a) => !coincide(a, scope[rol]));
}
