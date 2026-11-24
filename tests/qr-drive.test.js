import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { URL_RESUMEN_GIT, generarQrSvg, renderQrDrive } from '../src/components/QrDrive.js';

const RAIZ = resolve(import.meta.dirname, '..');

test('generarQrSvg devuelve un SVG para la URL del resumen', async () => {
  const svg = await generarQrSvg(URL_RESUMEN_GIT);
  assert.match(svg, /<svg/);
});

test('renderQrDrive muestra el QR y el enlace a Google Drive', async () => {
  const contenedor = { innerHTML: '' };
  await renderQrDrive(contenedor);
  assert.match(contenedor.innerHTML, /<svg/);
  assert.match(contenedor.innerHTML, /role="img"/);
  assert.ok(contenedor.innerHTML.includes(URL_RESUMEN_GIT));
});

test('recursos.js integra la sección del QR', () => {
  const codigo = readFileSync(resolve(RAIZ, 'src/recursos.js'), 'utf8');
  assert.match(codigo, /renderQrDrive\(/);
  assert.match(codigo, /id="resumen-qr"/);
});
