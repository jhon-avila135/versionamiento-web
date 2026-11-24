export const INDICE_SITIO = [
  // Informe (informe.html)
  {
    pagina: 'Informe',
    titulo: '1. Resumen ejecutivo',
    url: 'informe.html#resumen',
    keywords: 'resumen ejecutivo objetivos proyecto grupo 2 versionamiento',
  },
  {
    pagina: 'Informe',
    titulo: '2. Objetivos del proyecto',
    url: 'informe.html#objetivos',
    keywords: 'objetivo general especificos metas alcance',
  },
  {
    pagina: 'Informe',
    titulo: '3. Arquitectura del despliegue',
    url: 'informe.html#arquitectura',
    keywords: 'arquitectura despliegue cloudflare pages github actions sync gitlab',
  },
  {
    pagina: 'Informe',
    titulo: '4. Flujo de trabajo en Git y Conventional Commits',
    url: 'informe.html#flujo',
    keywords: 'flujo ramas feature develop test main conventional commits feat fix docs ci',
  },
  {
    pagina: 'Informe',
    titulo: '5. Reglas de protección de ramas',
    url: 'informe.html#reglas',
    keywords: 'reglas proteccion aprobaciones pull request merge bloqueado',
  },
  {
    pagina: 'Informe',
    titulo: '6. Variables y secretos',
    url: 'informe.html#variables',
    keywords: 'variables secretos secrets masked gitlab_token seguridad credenciales',
  },
  {
    pagina: 'Informe',
    titulo: '7. Mediciones y tiempos de despliegue',
    url: 'informe.html#mediciones',
    keywords: 'mediciones tiempos 49s 60s rendimiento github pages gitlab pages',
  },
  {
    pagina: 'Informe',
    titulo: '8. Hallazgos del equipo',
    url: 'informe.html#hallazgos',
    keywords: 'hallazgos aprendizajes resultados pruebas',
  },
  {
    pagina: 'Informe',
    titulo: '9. Enlaces y repositorios',
    url: 'informe.html#enlaces',
    keywords: 'enlaces links repositorio github gitlab sitios publicados',
  },

  // Investigación (investigacion.html)
  {
    pagina: 'Investigación',
    titulo: '1. Diferencias de modelo: GitHub vs. GitLab',
    url: 'investigacion.html#diferencias',
    keywords: 'diferencias modelo github gitlab comparativa vm contenedor docker',
  },
  {
    pagina: 'Investigación',
    titulo: '2. Despliegue en cada plataforma (CI/CD)',
    url: 'investigacion.html#despliegue',
    keywords: 'despliegue ci cd actions pipelines workflows yaml pages cloudflare',
  },
  {
    pagina: 'Investigación',
    titulo: '3. Reglas de protección (Rulesets vs. Protected Branches)',
    url: 'investigacion.html#reglas',
    keywords: 'rulesets protected branches revisiones code owners seguridad',
  },
  {
    pagina: 'Investigación',
    titulo: '4. Variables y gestión de despliegues',
    url: 'investigacion.html#variables',
    keywords: 'variables entorno environments secrets masked predefinidas sha',
  },
  {
    pagina: 'Investigación',
    titulo: '5. Buscador de 40 comandos Git principales',
    url: 'investigacion.html#comandos',
    keywords: 'comandos git buscador 40 rebase stash revert cherry-pick tag log',
  },
  {
    pagina: 'Investigación',
    titulo: '6. Cuentas educativas (GitHub Education vs. GitLab)',
    url: 'investigacion.html#educacion',
    keywords: 'cuentas educativas student pack github education gitlab uce institucional',
  },
  {
    pagina: 'Investigación',
    titulo: '7. Hallazgos de la implementación',
    url: 'investigacion.html#hallazgos',
    keywords: 'hallazgos implementacion rutas base validacion html',
  },
  {
    pagina: 'Investigación',
    titulo: '8. Criterios de selección',
    url: 'investigacion.html#seleccion',
    keywords: 'criterios seleccion cual elegir github o gitlab decision',
  },
  {
    pagina: 'Investigación',
    titulo: '9. Conclusiones',
    url: 'investigacion.html#conclusiones',
    keywords: 'conclusiones cierre recomendaciones',
  },
  {
    pagina: 'Investigación',
    titulo: '10. Referencias bibliográficas',
    url: 'investigacion.html#referencias',
    keywords: 'referencias bibliografia accelerate octoverse docs',
  },

  // Recursos (recursos.html)
  {
    pagina: 'Recursos',
    titulo: '1. Comandos Git por nivel y Top 10 por rol',
    url: 'recursos.html#comandos',
    keywords: 'top 10 comandos niveles esencial frecuente ocasional init clone push pull',
  },
  {
    pagina: 'Recursos',
    titulo: '2. Cuotas CI/CD y calculadora interactiva de minutos',
    url: 'recursos.html#cuotas',
    keywords: 'cuotas minutos gratis calculadora interactiva runners pricing',
  },
  {
    pagina: 'Recursos',
    titulo: '3. Estándares del repositorio',
    url: 'recursos.html#estandares',
    keywords: 'estandares convenciones nomenclatura ramas commits pull request',
  },
  {
    pagina: 'Recursos',
    titulo: '4. Problemas frecuentes y solución',
    url: 'recursos.html#errores',
    keywords: 'problemas errores frecuentes solucion conflictos merge rechazo push',
  },

  // Presentación (presentacion.html)
  {
    pagina: 'Presentación',
    titulo: 'Diapositivas de la exposición (19 láminas)',
    url: 'presentacion.html#lamina-1',
    keywords: 'presentacion diapositivas exposicion laminas pantalla completa',
  },
];

export function normalizarTexto(texto) {
  return String(texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function buscarEnIndice(consulta, indice = INDICE_SITIO) {
  const termino = normalizarTexto(consulta);
  if (!termino) return [];

  const palabras = termino.split(/\s+/);

  return indice.filter((item) => {
    const corpus = normalizarTexto(`${item.titulo} ${item.pagina} ${item.keywords}`);
    return palabras.every((palabra) => corpus.includes(palabra));
  });
}