# Guía: configurar el fork personal

Cada integrante trabaja desde un fork del repositorio principal `sampedro2002/versionamiento-web`. Los cambios llegan al repositorio principal solo mediante pull request hacia `develop`.

## 1. Crear el fork

1. Abrir https://github.com/sampedro2002/versionamiento-web y pulsar **Fork**.
2. Mantener el nombre `versionamiento-web` y **desmarcar** "Copy the main branch only", para conservar `develop` y `test`.

## 2. Configurar el repositorio local

Si todavía no tienes una copia local:

```bash
git clone https://github.com/<tu-usuario>/versionamiento-web.git
cd versionamiento-web
git remote add upstream https://github.com/sampedro2002/versionamiento-web.git
```

Si ya tenías un clon del repositorio principal:

```bash
git remote rename origin upstream
git remote add origin https://github.com/<tu-usuario>/versionamiento-web.git
```

En ambos casos, bloquea los envíos accidentales al repositorio principal y verifica:

```bash
git remote set-url --push upstream NO_PUSH
git remote -v
```

| Remoto | Apunta a | Uso |
|---|---|---|
| `origin` | Tu fork | Subir tus ramas |
| `upstream` | Repositorio principal | Traer los cambios del equipo (sin push) |

## 3. Instalar y comprobar

```bash
npm install
npm test
```

## 4. Flujo de cada tarea

```bash
git switch develop
git pull upstream develop
git switch -c feat/VER-<número>-<slug-corto>
git add .
git commit -m "VER-<número>: <descripción breve>"
git push -u origin feat/VER-<número>-<slug-corto>
```

Después, en GitHub, abre el pull request con base `sampedro2002/versionamiento-web` → `develop` y como origen tu fork y tu rama. El título sigue el formato `VER-<número> <Título exacto de la tarjeta en Jira>`.

## 5. Mantener el fork actualizado

```bash
git switch develop
git pull upstream develop
git push origin develop
```

También se puede usar el botón **Sync fork** en la página de tu fork.

> Las GitHub Actions vienen desactivadas en los forks. La validación se ejecuta en el pull request del repositorio principal.
