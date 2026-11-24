# Versionamiento Web - Arquitectura de Software

Sitio web informativo y de documentación desarrollado para la asignatura de **Arquitectura de Software** (Semestre 7) en la **Universidad Central del Ecuador** por el **Grupo 2**.

El proyecto compara **GitHub** y **GitLab** en un flujo de desarrollo colaborativo real con ramas protegidas, integración continua, sincronización automática entre repositorios y despliegue dual en **Cloudflare Pages**.

---

## Estructura de Páginas

La aplicación está configurada como un sitio multipágina (**MPA**) con **Vite**:

- **Inicio** (`index.html` · `src/main.js`): Portada minimalista sin menú superior, centrada en el título del proyecto y un buscador global (`src/data/search-index.js`) que indexa y redirige directamente a las secciones de todo el sitio.
- **Informe** (`informe.html` · `src/informe.js`): Resumen ejecutivo, objetivos, diagrama SVG de arquitectura de despliegue, flujo de ramas, gráfico de *Conventional Commits*, reglas de protección, manejo de secretos, mediciones reales de despliegue (`49 s` vs. `60 s`) y hallazgos.
- **Investigación** (`investigacion.html` · `src/investigacion.js`): Comparativa técnica entre GitHub y GitLab (modelos de ejecución, CI/CD, *Rulesets* vs. *Protected Branches*, variables/secretos), buscador interactivo de 40 comandos Git, cuentas educativas y criterios de selección.
- **Presentación** (`presentacion.html` · `src/presentacion.js`): Diapositivas interactivas en navegador con navegación por teclado y modo pantalla completa para la sustentación en clase.
- **Recursos** (`recursos.html` · `src/recursos.js`): Top 10 de comandos Git por rol, comandos organizados por nivel de uso (documentados en `docs/taxonomia-comandos.md`), calculadora interactiva de minutos CI/CD, estándares del repositorio, solución a errores frecuentes y código QR hacia Google Drive.

---

## Estructura del Repositorio

- `.github/workflows/`: Pipelines de validación y réplica espejo hacia GitLab.
- `docs/`: Documentación técnica complementaria (`taxonomia-comandos.md`).
- `public/`: Recursos estáticos públicos.
- `src/components/`: Componentes reutilizables (`layout`, buscador, calculadora, gráficos).
- `src/data/`: Datos estructurados en JSON y el índice global de búsqueda (`search-index.js`).
- `src/styles/`: Hojas de estilo modulares por página y componente.
- `src/*.js`: Puntos de entrada de cada página HTML (`main.js`, `informe.js`, `investigacion.js`, `presentacion.js`, `recursos.js`).
- `tests/`: Pruebas unitarias y estructurales con `node --test`.
- `.gitlab-ci.yml`: Pipeline de validación y despliegue en GitLab CI.
- `index.html`, `informe.html`, `investigacion.html`, `presentacion.html`, `recursos.html`: Páginas del sitio MPA.

---

## Tecnologías y Herramientas

- **Frontend:** HTML5, CSS3 y JavaScript moderno (ES Modules).
- **Empaquetador:** Vite (configuración multipágina).
- **Pruebas:** Runner nativo de Node.js (`node --test`).
- **Control de versiones y CI/CD:** Git, GitHub Actions, GitLab CI y Cloudflare Pages.
- **Gestión ágil:** Jira (`VersionamientoWebG2`) integrado con GitHub.

---

## Instalación, Pruebas y Uso

1. **Instalar dependencias:** `npm install` (o `pnpm install`)
2. **Servidor de desarrollo:** `npm run dev` (`http://localhost:5173`)
3. **Pruebas automatizadas:** `npm test` (ejecuta `node --test`)
4. **Compilar para producción:** `npm run build` (genera `dist/`)
5. **Previsualizar producción:** `npm run preview`

---

## Flujo de Trabajo y Convenciones (Jira – Git)

- **Ramas:** `feat/*` y `fix/*` nacen desde `develop` (o desde el *fork* personal hacia `upstream/develop`), pasan a `test` y finalmente a `main` (protegida con revisión obligatoria).
- **Nomenclatura de rama:** `<feat|fix>/VER-<número>-<slug-corto>`
- **Mensaje de commit:** `VER-<número>: <descripción breve>`
- **Título de Pull Request:** `VER-<número> <Título exacto de la tarjeta en Jira>`
- **Fork personal:** pasos para crear y configurar el fork en [`docs/guia-fork.md`](docs/guia-fork.md).

---

## Equipo - Grupo 2

- **Jhon Ávila** · **Alexander Chicango** · **José Cuadro** · **Bruno Sampedro**
- **Universidad Central del Ecuador** · Facultad de Ingeniería y Ciencias Aplicadas · Sistemas de Información · Semestre 7.
