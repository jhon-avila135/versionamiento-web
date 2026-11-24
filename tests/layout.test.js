import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { renderizarNavbar, renderizarFooter } from '../src/components/layout.js';

const RAIZ = resolve(import.meta.dirname, '..');

function crearElementoMock(tagName) {
  const clases = new Set();
  return {
    tagName: tagName.toUpperCase(),
    className: '',
    textContent: '',
    href: '',
    children: [],
    classList: {
      add: (...items) => items.forEach((c) => clases.add(c)),
      contains: (c) => clases.has(c),
    },
    appendChild(hijo) {
      this.children.push(hijo);
      return hijo;
    },
  };
}

function configurarEntornoDom(pathname) {
  const prepended = [];
  const appended = [];

  globalThis.window = {
    location: { pathname },
  };

  globalThis.document = {
    createElement: (tag) => crearElementoMock(tag),
    body: {
      prepend: (el) => prepended.push(el),
      appendChild: (el) => appended.push(el),
    },
  };

  return { prepended, appended };
}

test('renderizarNavbar genera los 5 enlaces y marca como activo el de la página actual', () => {
  const { prepended } = configurarEntornoDom('/investigacion.html');

  renderizarNavbar();

  assert.equal(prepended.length, 1);
  const nav = prepended[0];
  assert.equal(nav.tagName, 'NAV');
  assert.equal(nav.className, 'navbar');

  const lista = nav.children[0];
  assert.equal(lista.tagName, 'UL');
  assert.equal(lista.children.length, 5);

  const enlaces = lista.children.map((li) => li.children[0]);
  assert.deepEqual(
    enlaces.map((a) => ({ href: a.href, texto: a.textContent, activo: a.classList.contains('activo') })),
    [
      { href: 'index.html', texto: 'Inicio', activo: false },
      { href: 'informe.html', texto: 'Informe', activo: false },
      { href: 'investigacion.html', texto: 'Investigación', activo: true },
      { href: 'presentacion.html', texto: 'Presentación', activo: false },
      { href: 'recursos.html', texto: 'Recursos', activo: false },
    ]
  );
});

test('renderizarNavbar marca index.html como activo cuando la ruta es la raíz "/"', () => {
  const { prepended } = configurarEntornoDom('/');

  renderizarNavbar();

  const enlaces = prepended[0].children[0].children.map((li) => li.children[0]);
  assert.equal(enlaces[0].href, 'index.html');
  assert.equal(enlaces[0].classList.contains('activo'), true);
});

test('renderizarFooter agrega el pie institucional al body', () => {
  const { appended } = configurarEntornoDom('/index.html');

  renderizarFooter();

  assert.equal(appended.length, 1);
  const footer = appended[0];
  assert.equal(footer.tagName, 'FOOTER');
  assert.equal(footer.className, 'footer');
  assert.equal(footer.textContent, 'Universidad Central del Ecuador - Grupo 2');
});

test('style.css mantiene el layout de .container sin estilos de tarjeta (card)', () => {
  const css = readFileSync(resolve(RAIZ, 'src/styles/style.css'), 'utf8');
  const bloqueContainer = css.match(/\.container\s*\{[^}]*\}/);
  assert.ok(bloqueContainer, 'Debe existir la regla .container en src/styles/style.css');
  assert.match(bloqueContainer[0], /flex:\s*1/);
  assert.match(bloqueContainer[0], /max-width:\s*900px/);
  assert.doesNotMatch(bloqueContainer[0], /box-shadow/);
  assert.doesNotMatch(bloqueContainer[0], /border-radius/);
});

test('inicio oculta el navbar por defecto y lo muestra al pasar el cursor', () => {
  const mainJs = readFileSync(resolve(RAIZ, 'src/main.js'), 'utf8');
  const inicioCss = readFileSync(resolve(RAIZ, 'src/styles/inicio.css'), 'utf8');

  assert.match(mainJs, /document\.body\.classList\.add\('pagina-inicio'\)/);
  assert.match(inicioCss, /body\.pagina-inicio \.navbar\s*\{[\s\S]*opacity:\s*0;[\s\S]*transform:\s*translateY\(-100%\)/);
  assert.match(inicioCss, /body\.pagina-inicio \.navbar:hover[\s\S]*opacity:\s*1;[\s\S]*transform:\s*translateY\(0\)/);
});
