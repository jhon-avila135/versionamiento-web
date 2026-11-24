import './styles/style.css';
import './styles/recursos.css';
import './styles/top-commands.css';
import './styles/ci-calculator.css';
import './styles/callout.css';
import './styles/command-level.css';
import { renderizarNavbar, renderizarFooter } from './components/layout.js';
import commandsTop10 from './data/commands-top10.json';
import commandsAll from './data/commands-all.json';
import { renderTopCommands } from './components/TopCommands.js';
import { renderCICalculator } from './components/CICalculator.js';
import { renderCallout } from './components/Callout.js';
import { renderCommandLevel } from './components/CommandLevel.js';
import { renderQrDrive } from './components/QrDrive.js';

export const COMANDOS_GIT = [
  { cmd: 'git clone <url>', categoria: 'Remotos', desc: 'Clona el repositorio remoto completo con su historial.' },
  { cmd: 'git switch -c <rama>', categoria: 'Ramas', desc: 'Crea y cambia a una rama aislada de trabajo.' },
  { cmd: 'git status -s', categoria: 'Cambios', desc: 'Muestra en formato corto los archivos modificados o sin seguimiento.' },
  { cmd: 'git add .', categoria: 'Cambios', desc: 'Envía todos los cambios al área de preparación (Staging).' },
  { cmd: 'git commit -m "feat: mensaje"', categoria: 'Cambios', desc: 'Registra una instantánea usando Conventional Commits.' },
  { cmd: 'git push -u origin <rama>', categoria: 'Remotos', desc: 'Publica la rama local en el repositorio remoto.' },
  { cmd: 'git fetch --all', categoria: 'Remotos', desc: 'Descarga referencias y ramas remotas sin alterar el código local.' },
  { cmd: 'git pull --rebase origin develop', categoria: 'Ramas', desc: 'Actualiza la rama actual manteniendo un historial limpio y lineal.' },
  { cmd: 'git diff', categoria: 'Cambios', desc: 'Muestra línea por línea los cambios aún no confirmados.' },
  { cmd: 'git log --oneline --graph -n 10', categoria: 'Historial', desc: 'Visualiza el árbol de commits y fusiones recientes.' },
  { cmd: 'git stash', categoria: 'Cambios', desc: 'Guarda temporalmente cambios sin confirmar para cambiar de rama.' },
  { cmd: 'git revert <hash>', categoria: 'Historial', desc: 'Revierte un commit previo creando uno nuevo sin reescribir historial.' },
  { cmd: 'git tag -a v1.0.0 -m "Release"', categoria: 'Historial', desc: 'Crea una etiqueta anotada bajo Semantic Versioning.' },
  { cmd: 'git push origin v1.0.0', categoria: 'Remotos', desc: 'Publica la etiqueta de versión en el remoto.' },
  { cmd: 'git branch -d <rama>', categoria: 'Ramas', desc: 'Elimina localmente una rama ya fusionada.' },
];

export function filtrarComandos(lista, categoria = 'Todos', termino = '') {
  const q = termino.trim().toLowerCase();
  return lista.filter((item) => {
    const coincideCat = categoria === 'Todos' || item.categoria === categoria;
    const coincideTexto =
      !q || item.cmd.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
    return coincideCat && coincideTexto;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderizarNavbar();
  renderizarFooter();

  const contenedor = document.querySelector('main.container');
  contenedor.classList.add('recursos');

  contenedor.innerHTML = `
    <header class="encabezado-recursos">
      <h1>Recursos técnicos del proyecto</h1>
      <p>Comandos Git del flujo colaborativo, cuotas de CI/CD, estándares y solución de errores · Arquitectura de Software · Grupo 2</p>
    </header>

    <nav class="indice" aria-label="Contenido de recursos">
      <p>Contenido</p>
      <ol>
        <li><a href="#top-comandos">Top 10 comandos Git</a></li>
        <li><a href="#comandos">Comandos Git por nivel de uso</a></li>
        <li><a href="#nivel-esencial">Nivel Esencial (🔥)</a></li>
        <li><a href="#nivel-frecuente">Nivel Frecuente (⚡)</a></li>
        <li><a href="#nivel-ocasional">Nivel Ocasional (🧊)</a></li>
        <li><a href="#cuotas">Cuotas de ejecución CI/CD</a></li>
        <li><a href="#calculadora-ci">Calculadora de minutos CI/CD</a></li>
        <li><a href="#estandares">Estándares del repositorio</a></li>
        <li><a href="#errores">Problemas frecuentes y solución</a></li>
        <li><a href="#resumen-qr">Resumen de comandos (QR)</a></li>
      </ol>
    </nav>

    <div id="slot-top-comandos"></div>

    <section id="comandos">
      <h2><span class="num">1.</span>Comandos Git organizados por nivel de uso</h2>
      <p>Todos los comandos del flujo <code>feature/*</code> &rarr; <code>develop</code> &rarr; <code>test</code> &rarr; <code>main</code> clasificados en tres niveles según su frecuencia operativa.</p>
      <div id="slot-niveles-comandos"></div>
    </section>

    <section id="cuotas">
      <h2><span class="num">2.</span>Cuotas de ejecución CI/CD</h2>
      <p>Límites gratuitos de cómputo para ejecutar pipelines de validación y despliegue en cada plataforma:</p>
      <div class="tabla">
        <table>
          <caption><strong>Tabla 2.</strong> Minutos gratuitos y multiplicadores por sistema operativo.</caption>
          <thead>
            <tr>
              <th scope="col">Plataforma / Plan</th>
              <th scope="col">Minutos gratis incluidos</th>
              <th scope="col">Regla de consumo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GitHub Actions (Free)</td>
              <td>2.000 min/mes en privados · Ilimitado en públicos</td>
              <td>Linux ×1, Windows ×2, macOS ×10 (redondeo al minuto superior)</td>
            </tr>
            <tr>
              <td>GitHub Pro (Student Pack)</td>
              <td>3.000 min/mes en privados · Ilimitado en públicos</td>
              <td>Incluye protección de ramas en repositorios privados</td>
            </tr>
            <tr>
              <td>GitLab CI/CD (Free)</td>
              <td>400 min/mes compartidos (públicos y privados)</td>
              <td>Runners compartidos ×1; runners propios consumen 0 min</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="slot-calculadora-ci"></div>
      ${renderCallout({
        tipo: 'info',
        titulo: 'Runners grandes (larger runners)',
        texto:
          'Los runners grandes de GitHub Actions nunca consumen minutos gratuitos incluidos en tu cuota mensual: siempre se facturan por minuto desde el primer uso.',
      })}
    </section>

    <section id="estandares">
      <h2><span class="num">3.</span>Estándares del repositorio</h2>
      <ul>
        <li><strong>Conventional Commits:</strong> <code>feat:</code> (nueva función), <code>fix:</code> (corrección), <code>docs:</code> (documentación), <code>style:</code> (estilos), <code>test:</code> (pruebas), <code>ci:</code> (pipelines) y <code>chore:</code> (mantenimiento).</li>
        <li><strong>Semantic Versioning (SemVer):</strong> etiquetas anotadas con formato <code>vMAYOR.MENOR.PARCHE</code> (por ejemplo, <code>v1.0.0</code> para la primera entrega estable en <code>main</code>).</li>
        <li><strong>Integración por Pull Request:</strong> ninguna rama protegida recibe commits directos; todo aporte pasa por revisión de pares y checks automáticos en verde.</li>
      </ul>
      <div class="destacado">
        <p><strong>Nota de integración:</strong> Al fusionar un Pull Request con varias tareas en GitHub, seleccionar <em>Create a merge commit</em> conserva en el historial cada commit atómico realizado en la rama de trabajo.</p>
      </div>
    </section>

    <section id="errores">
      <h2><span class="num">4.</span>Problemas frecuentes y solución</h2>
      <dl>
        <dt>Push rechazado en rama protegida</dt>
        <dd>Ocurre al intentar subir cambios directamente a <code>main</code>, <code>test</code> o <code>develop</code>. Crea una rama de trabajo con <code>git switch -c feature/nombre</code> y abre un Pull Request.</dd>

        <dt>Rama local desactualizada frente a develop</dt>
        <dd>Antes de abrir un Pull Request, sincroniza los últimos cambios integrados por el equipo mediante <code>git pull --rebase origin develop</code>.</dd>

        <dt>Deshacer un commit ya publicado sin alterar el historial</dt>
        <dd>En ramas compartidas evita <code>git reset --hard</code>; utiliza <code>git revert HEAD</code> para registrar un commit inverso seguro.</dd>

        <dt>Cambiar de rama con modificaciones sin terminar</dt>
        <dd>Guarda temporalmente tus cambios en la pila con <code>git stash</code> y recupéralos al volver mediante <code>git stash pop</code>.</dd>
      </dl>
    </section>

    <section id="resumen-qr">
      <h2><span class="num">5.</span>Resumen de comandos para llevar</h2>
      <p>Guía en PDF con el flujo de trabajo, los comandos más usados y cómo deshacer cambios.</p>
      <div id="slot-qr-drive"></div>
    </section>
  `;

  renderTopCommands(document.getElementById('slot-top-comandos'), commandsTop10);
  renderCommandLevel(document.getElementById('slot-niveles-comandos'), commandsAll);
  renderCICalculator(document.getElementById('slot-calculadora-ci'));
  renderQrDrive(document.getElementById('slot-qr-drive'));
});