# 🚀 Deploy Purpur Landing Page en Vercel con GitHub conectado

Esta guía describe cómo subir **todo el repositorio** a Vercel y mantenerlo sincronizado con GitHub para que las implementaciones automáticas se activen con cada commit. Asume que tu archivo `.env` ya contiene las llaves de Google/Vertex y que estás trabajando desde:

```
/Users/camilotoloza/Library/CloudStorage/GoogleDrive-camilotoloza1136@gmail.com/My Drive/PURPUR/purpur-landing-page
```

---

## 1. Publica el repositorio en GitHub

1. Inicializa el repo (solo la primera vez):
   ```bash
   cd "/Users/camilotoloza/Library/CloudStorage/GoogleDrive-camilotoloza1136@gmail.com/My Drive/PURPUR/purpur-landing-page"
   git init
   git branch -M main
   ```
2. Configura tu usuario (se lee desde `.env`, pero puedes usar directamente):
   ```bash
   git config user.name  "Camilo Toloza"
   git config user.email "cto@purrpur.com"
   ```
3. Añade todos los archivos y haz el commit base:
   ```bash
   git add .
   git commit -m "chore: bootstrap purpur landing page"
   ```
4. Crea un repositorio vacío en GitHub (https://github.com/new) y copia la URL:
   ```bash
   git remote add origin https://github.com/<usuario>/purpur-landing-page.git
   git push -u origin main
   ```

> Con esto, todo el árbol del proyecto (landing, agentes, docs, workspaces) queda versionado. Desde este punto, cualquier commit nuevo gatilla despliegues automáticos en Vercel cuando lo conectes.

---

## 2. Autoriza a Vercel con permisos de escritura

1. Ve a https://vercel.com/integrations/git y conecta tu cuenta de GitHub.
2. Selecciona el repositorio `purpur-landing-page` y, cuando GitHub lo solicite, marca **"Contents – Read & write"**.  
   Esto permite que Vercel registre estados de build, cree comentarios en PRs y ejecute previews por commit (no modifica tu código, pero necesita write para reportar estados).

---

## 3. Importa el proyecto en Vercel

1. En https://vercel.com/new -> pestaña **"Import Git Repository"**.
2. Elige `purpur-landing-page`.
3. Configura:
   - **Framework**: Next.js (se autodetecta).
   - **Root Directory**: `/` (Vercel construirá la app principal ubicada en `app/`).
   - **Build Command**: `npm run build`.
   - **Output Directory**: `.next`.
4. Copia al panel de **Environment Variables** todas las claves que ya tienes en `.env`:
   - `GOOGLE_CLOUD_PROJECT`, `GOOGLE_CLOUD_LOCATION`, etc.
   - Credenciales propias de los agentes o cualquier variable marcada como `NEXT_PUBLIC_*` en el futuro.
5. Guarda y ejecuta el primer deploy.

> Si en algún momento deseas desplegar otra sub-app (por ejemplo `purrpurr_web/`), crea un **Project** distinto en Vercel y apunta el “Root Directory” a `purrpurr_web`.

---

## 4. Mantén sincronización automática GitHub ↔ Vercel

- **Commits locales**  
  Cada vez que guardes cambios:
  ```bash
  git add .
  git commit -m "feat: describe tu cambio"
  git push origin main
  ```
  Vercel generará un *Production Deployment* sobre `main` y, si trabajas en branches, creará *Preview Deployments* con URL únicas.

- **Commits desde Vercel**  
  Desde la página de cada deployment puedes usar el botón **"View Source" → "Edit on GitHub"** para abrir el archivo directamente en GitHub y crear un commit sin salir del navegador. Gracias al permiso “write” que diste en el paso 2, esos commits aparecerán en tu repo y dispararán un nuevo build.

---

## 5. Subir manualmente (CLI) todos los archivos a Vercel

Si necesitas desplegar antes de conectar GitHub (por ejemplo para QA rápido), usa la CLI:

```bash
cd "/Users/camilotoloza/Library/CloudStorage/GoogleDrive-camilotoloza1136@gmail.com/My Drive/PURPUR/purpur-landing-page"
vercel login                      # una sola vez
vercel link                       # vincula esta carpeta al proyecto creado
vercel deploy --yes --prod        # sube todo el árbol y publica versión productiva
```

- La CLI respeta `.gitignore`, pero **incluye** el resto del repositorio (agentes, docs, assets).  
- Para mover otra app, define `VERCEL_DEPLOY_PATH` en tu `.env` o pasa el path directamente: `vercel deploy --prod ./purrpurr_web`.

---

## 6. Exponer los agentes vía web

Vercel solo hospeda la interfaz (Next.js). Tu orquestador ADK sigue corriendo en tu servidor/VM. Para usarlo desde la web:

1. Mantén `adk web purrpurragent/` ejecutándose en un host accesible (o túnel seguro).
2. Expón la URL pública como variable `NEXT_PUBLIC_AGENT_ENDPOINT` (puedes agregar este `process.env` donde implementes el cliente HTTP).
3. El sitio desplegado en Vercel consumirá ese endpoint para disparar workflows del agente.

---

## 7. Checklist de verificación

- [ ] Repo `purpur-landing-page` existe en GitHub con rama `main`.
- [ ] Vercel GitHub App tiene permisos “Contents read & write”.
- [ ] Proyecto importado en Vercel con Build Command `npm run build`.
- [ ] Variables de entorno replicadas en **Project Settings → Environment Variables**.
- [ ] Primer deployment exitoso (`https://<project>.vercel.app`).
- [ ] Commits posteriores disparan builds automáticos.

Con esto puedes administrar el código desde GitHub, disparar despliegues en Vercel y acceder al sistema multi-agente desde cualquier navegador. 💜

