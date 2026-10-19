// Labels del tablero (ADR-0004 de la consultora). El estado y el tamaño son campos del Project, no labels.
const ROLES = ['pm', 'arquitecto', 'analista', 'dev', 'qa', 'revisor', 'devops'];

export const LABELS = [
  { nombre: 'tipo:cu', color: '5319e7', descripcion: 'Caso de uso (issue padre)' },
  { nombre: 'tipo:hu', color: '1d76db', descripcion: 'Historia de usuario (sub-issue de un caso de uso)' },
  { nombre: 'tipo:tecnica', color: 'fbca04', descripcion: 'Tarea técnica (referencia un ADR o un riesgo)' },
  { nombre: 'needs-pedro', color: 'b60205', descripcion: 'Necesita una decisión de Pedro' },
  { nombre: 'needs-confidentiality-review', color: 'e99695', descripcion: 'Revisar confidencialidad antes de publicar' },
  ...ROLES.map((rol) => ({ nombre: `rol:${rol}`, color: 'c5def5', descripcion: `PR hecho con el perfil ${rol}` })),
];

export function argumentosGh(label, repo) {
  const args = ['label', 'create', label.nombre, '--color', label.color, '--description', label.descripcion, '--force'];
  return repo ? [...args, '--repo', repo] : args;
}
