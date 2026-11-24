import './styles/style.css';
import './styles/inicio.css';
import { renderizarNavbar, renderizarFooter } from './components/layout.js';
import { buscarEnIndice } from './data/search-index.js';

function escaparHtml(texto) {
  return String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('pagina-inicio');
  renderizarNavbar();
  renderizarFooter();

  const contenedor = document.querySelector('main.container');
  contenedor.classList.add('inicio');

  contenedor.innerHTML = `
    <section class="inicio-centro" aria-labelledby="titulo-sitio">
      <h1 id="titulo-sitio" class="inicio-titulo">Gestión de Versionamiento</h1>

      <form id="form-busqueda-global" class="buscador-global" role="search">
        <label for="input-busqueda-global" class="sr-only">
          Buscar secciones en todo el sitio
        </label>
        <div class="buscador-caja">
          <input
            id="input-busqueda-global"
            class="buscador-input"
            type="search"
            placeholder="Buscar temas, comandos, CI/CD, reglas, informe..."
            autocomplete="off"
          />
          <button type="submit" class="buscador-boton">Buscar</button>
        </div>
        <ul
          id="resultados-busqueda-global"
          class="buscador-resultados"
          aria-label="Resultados de búsqueda"
          hidden
        ></ul>
      </form>
    </section>
  `;

  const form = document.getElementById('form-busqueda-global');
  const input = document.getElementById('input-busqueda-global');
  const listaResultados = document.getElementById('resultados-busqueda-global');

  function renderizarResultados(consulta) {
    if (!consulta.trim()) {
      listaResultados.innerHTML = '';
      listaResultados.hidden = true;
      return;
    }

    const coincidencias = buscarEnIndice(consulta);
    listaResultados.hidden = false;

    if (coincidencias.length === 0) {
      listaResultados.innerHTML = `
        <li class="buscador-vacio">
          No se encontraron secciones para "<strong>${escaparHtml(consulta.trim())}</strong>".
        </li>
      `;
      return;
    }

    listaResultados.innerHTML = coincidencias
      .map(
        (item) => `
        <li>
          <a class="buscador-item" href="${escaparHtml(item.url)}">
            <span class="buscador-pagina">${escaparHtml(item.pagina)}</span>
            <span class="buscador-seccion">${escaparHtml(item.titulo)}</span>
          </a>
        </li>
      `
      )
      .join('');
  }

  input.addEventListener('input', (evento) => {
    renderizarResultados(evento.target.value);
  });

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const coincidencias = buscarEnIndice(input.value);
    if (coincidencias.length > 0) {
      window.location.href = coincidencias[0].url;
    } else {
      renderizarResultados(input.value);
    }
  });
});