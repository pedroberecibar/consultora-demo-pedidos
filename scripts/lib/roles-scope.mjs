// Lee el formato acotado de .consultora/roles-scope.yml: "rol:" (o "rol: []") y debajo "  - glob".
export function parsearRolesScope(texto) {
  const roles = {};
  let actual = null;
  texto.split(/\r?\n/).forEach((linea, i) => {
    const limpia = linea.trim();
    if (limpia === '' || limpia.startsWith('#')) return;
    const rol = linea.match(/^([a-z][a-z0-9-]*):\s*(\[\])?\s*$/);
    if (rol) {
      actual = rol[1];
      roles[actual] = [];
      return;
    }
    const item = linea.match(/^\s+-\s+(.+?)\s*$/);
    if (item && actual) {
      roles[actual].push(item[1].replace(/^(['"])(.*)\1$/, '$2'));
      return;
    }
    throw new Error(`roles-scope.yml, línea ${i + 1}: formato no válido: "${linea}"`);
  });
  return roles;
}
