import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { INDICE_SITIO, buscarEnIndice } from '../src/data/search-index.js';

const RAIZ = resolve(import.meta.dirname, '..');

test('Todas las URLs del índice apuntan a archivos HTML existentes', () => {
  for (const entrada of INDICE_SITIO) {
    const [archivo] = entrada.url.split('#');
    assert.equal(
      existsSync(resolve(RAIZ, archivo)),
      true,
      `La ruta ${archivo} no existe en el proyecto`
    );
  }
});

test('buscarEnIndice encuentra secciones sin importar tildes o mayúsculas', () => {
  const resultados = buscarEnIndice('proteccion');
  assert.ok(resultados.length >= 2);
  assert.ok(resultados.some((r) => r.url === 'informe.html#reglas'));
  assert.ok(resultados.some((r) => r.url === 'investigacion.html#reglas'));
});

test('buscarEnIndice devuelve arreglo vacío con consulta en blanco o inexistente', () => {
  assert.deepEqual(buscarEnIndice('   '), []);
  assert.deepEqual(buscarEnIndice('termino-inexistente-xyz'), []);
});

test('index.html e inicio.css ocultan el menú superior y muestran título y buscador', () => {
  const css = readFileSync(resolve(RAIZ, 'src/styles/inicio.css'), 'utf8');
  const mainJs = readFileSync(resolve(RAIZ, 'src/main.js'), 'utf8');

  assert.match(css, /body\.pagina-inicio\s+\.navbar\s*\{\s*display:\s*none;/);
  assert.match(mainJs, /id="form-busqueda-global"/);
  assert.match(mainJs, /id="input-busqueda-global"/);
});