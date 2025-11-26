# 🚀 Desplegar Agente Purrpur en Google Cloud Run

Guía paso a paso para desplegar el agente Purrpur en Google Cloud Run y hacerlo accesible desde cualquier dispositivo.

---

## ✅ Prerrequisitos

1. ✅ Cuenta de Google Cloud Platform (GCP)
2. ✅ `gcloud` CLI instalado y configurado
3. ✅ Proyecto GCP creado
4. ✅ Billing habilitado en GCP (Cloud Run requiere billing)

---

## 📋 Paso 1: Configurar Google Cloud

### 1.1. Instalar gcloud CLI (si no lo tienes)

```bash
# macOS
brew install google-cloud-sdk

# O descarga desde:
# https://cloud.google.com/sdk/docs/install
```

### 1.2. Autenticarse

```bash
gcloud auth login
gcloud auth application-default login
```

### 1.3. Crear/Seleccionar Proyecto

```bash
# Listar proyectos existentes
gcloud projects list

# Crear nuevo proyecto (opcional)
gcloud projects create purrpur-agent --name="Purrpur Agent"

# Seleccionar proyecto
gcloud config set project PURJECT_ID
# Reemplaza PURJECT_ID con tu PROJECT_ID real
```

### 1.4. Habilitar APIs Necesarias

```bash
# Habilitar Cloud Run API
gcloud services enable run.googleapis.com

# Habilitar Cloud Build API
gcloud services enable cloudbuild.googleapis.com

# Habilitar Container Registry API (si usas gcr.io)
gcloud services enable containerregistry.googleapis.com

# O Artifact Registry (recomendado)
gcloud services enable artifactregistry.googleapis.com
```

---

## 🐳 Paso 2: Preparar Dockerfile

El archivo `Dockerfile.adk` ya está creado en la raíz del proyecto. Verifica que existe:

```bash
ls -la Dockerfile.adk
```

Si necesitas ajustarlo, el contenido debería ser:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código del agente
COPY purrpurragent/ ./purrpurragent/

# Exponer puerto (Cloud Run usa PORT automáticamente)
EXPOSE 8080

# Variables de entorno
ENV PORT=8080

# Iniciar servidor ADK
CMD python -m adk web purrpurragent/ --host 0.0.0.0 --port ${PORT:-8080}
```

---

## 🔨 Paso 3: Build de la Imagen Docker

### Opción A: Usar Cloud Build (Recomendado)

```bash
# Reemplaza PROJECT_ID con tu proyecto real
export PROJECT_ID="tu-proyecto-gcp"

# Build y push a Container Registry
gcloud builds submit --tag gcr.io/$PROJECT_ID/purrpur-adk
```

### Opción B: Usar Artifact Registry (Más moderno)

```bash
# Crear repositorio (solo primera vez)
gcloud artifacts repositories create purrpur-repo \
  --repository-format=docker \
  --location=us-central1

# Build y push
gcloud builds submit --tag us-central1-docker.pkg.dev/$PROJECT_ID/purrpur-repo/purrpur-adk
```

**⏱️ Tiempo estimado:** 5-10 minutos

---

## 🚀 Paso 4: Deploy en Cloud Run

### 4.1. Deploy Básico

```bash
gcloud run deploy purrpur-adk \
  --image gcr.io/$PROJECT_ID/purrpur-adk \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

### 4.2. Deploy con Configuración Optimizada

```bash
gcloud run deploy purrpur-adk \
  --image gcr.io/$PROJECT_ID/purrpur-adk \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --memory 2Gi \
  --cpu 2 \
  --timeout 300 \
  --min-instances 0 \
  --max-instances 10 \
  --set-env-vars "GOOGLE_CLOUD_PROJECT=$PROJECT_ID,GOOGLE_CLOUD_LOCATION=us-central1"
```

**Parámetros explicados:**
- `--memory 2Gi`: 2GB de RAM (ajusta según necesidades)
- `--cpu 2`: 2 CPUs (puedes usar 1 para ahorrar costos)
- `--timeout 300`: 5 minutos máximo por request
- `--min-instances 0`: Escala a cero cuando no hay tráfico (ahorra costos)
- `--max-instances 10`: Máximo 10 instancias simultáneas

**⏱️ Tiempo estimado:** 2-3 minutos

---

## 🌐 Paso 5: Obtener URL Pública

```bash
# Obtener URL del servicio desplegado
gcloud run services describe purrpur-adk \
  --region us-central1 \
  --format 'value(status.url)'
```

**Guarda esta URL**, será algo como:
```
https://purrpur-adk-xxxxx-uc.a.run.app
```

### Verificar que Funciona

```bash
# Health check
curl https://purrpur-adk-xxxxx-uc.a.run.app/health

# O abrir en navegador
open https://purrpur-adk-xxxxx-uc.a.run.app
```

---

## 🔧 Paso 6: Configurar Variables de Entorno Adicionales

Si necesitas más variables de entorno (GitHub token, Vercel token, etc.):

```bash
gcloud run services update purrpur-adk \
  --region us-central1 \
  --update-env-vars "GITHUB_TOKEN=ghp_xxxxx,VERCEL_TOKEN=vercel_xxxxx"
```

O desde la consola web:
1. Ve a https://console.cloud.google.com/run
2. Selecciona `purrpur-adk`
3. **Edit & Deploy New Revision**
4. **Variables & Secrets** → Agrega variables

---

## 🌍 Paso 7: Configurar Vercel para Next.js

### 7.1. Conectar Repositorio en Vercel

1. Ve a https://vercel.com/new
2. Conecta tu repositorio de GitHub
3. Configura:
   - **Root Directory:** `purrpurr_web`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

### 7.2. Agregar Variable de Entorno

En Vercel Dashboard → Settings → Environment Variables:

```
ADK_SERVER_URL=https://purrpur-adk-xxxxx-uc.a.run.app
```

### 7.3. Deploy

```bash
cd purrpurr_web
vercel deploy --prod
```

O simplemente haz push a `main` si tienes auto-deploy configurado.

---

## ✅ Paso 8: Verificar Deployment Completo

1. **Verificar ADK Server:**
   ```bash
   curl https://purrpur-adk-xxxxx-uc.a.run.app/health
   ```

2. **Verificar Next.js:**
   ```bash
   curl https://tu-app.vercel.app/api/agent
   ```

3. **Probar desde Navegador:**
   - Abre: `https://tu-app.vercel.app/agent`
   - Envía un mensaje de prueba
   - Deberías recibir respuesta del agente

4. **Probar desde Otro Dispositivo:**
   - Abre la misma URL desde tu teléfono
   - Verifica que funcione

---

## 💰 Costos Estimados

Cloud Run cobra por:
- **Requests:** Primeros 2 millones gratis/mes
- **CPU/Memoria:** Solo cuando está corriendo
- **Con `min-instances 0`:** Solo pagas cuando hay tráfico

**Estimación mensual:**
- Tráfico bajo (< 1000 requests/día): ~$0-5/mes
- Tráfico medio (10k requests/día): ~$10-30/mes
- Tráfico alto (100k+ requests/día): ~$50-200/mes

---

## 🔄 Actualizar Deployment

Cuando hagas cambios al código:

```bash
# 1. Rebuild imagen
gcloud builds submit --tag gcr.io/$PROJECT_ID/purrpur-adk

# 2. Redeploy (Cloud Run actualiza automáticamente)
gcloud run deploy purrpur-adk \
  --image gcr.io/$PROJECT_ID/purrpur-adk \
  --region us-central1
```

O usa el script automatizado:
```bash
./deploy_adk_cloudrun.sh
```

---

## 🐛 Troubleshooting

### Error: "Permission denied"

```bash
# Verificar permisos
gcloud projects get-iam-policy $PROJECT_ID

# Agregar permisos necesarios
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="user:tu-email@gmail.com" \
  --role="roles/run.admin"
```

### Error: "Billing not enabled"

1. Ve a https://console.cloud.google.com/billing
2. Vincula una cuenta de facturación
3. Cloud Run requiere billing habilitado

### Error: "Image not found"

```bash
# Verificar que la imagen existe
gcloud container images list --repository=gcr.io/$PROJECT_ID

# O rebuild
gcloud builds submit --tag gcr.io/$PROJECT_ID/purrpur-adk
```

### Error: "Timeout"

```bash
# Aumentar timeout
gcloud run services update purrpur-adk \
  --region us-central1 \
  --timeout 600  # 10 minutos
```

### Error: "Out of memory"

```bash
# Aumentar memoria
gcloud run services update purrpur-adk \
  --region us-central1 \
  --memory 4Gi
```

---

## 📊 Monitoreo

### Ver Logs

```bash
# Logs en tiempo real
gcloud run services logs tail purrpur-adk --region us-central1

# Logs específicos
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=purrpur-adk" --limit 50
```

### Ver Métricas

1. Ve a https://console.cloud.google.com/run
2. Selecciona `purrpur-adk`
3. Ve a la pestaña **Metrics**
4. Revisa:
   - Request count
   - Latency
   - Error rate
   - CPU/Memory usage

---

## 🎉 ¡Listo!

Tu agente Purrpur ahora está:
- ✅ Desplegado en Google Cloud Run
- ✅ Accesible públicamente desde cualquier dispositivo
- ✅ Conectado a tu interfaz Next.js en Vercel
- ✅ Listo para recibir requests

**URL pública:** `https://tu-app.vercel.app/agent`

---

## 📚 Recursos Adicionales

- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Cloud Run Pricing](https://cloud.google.com/run/pricing)
- [Vercel Documentation](https://vercel.com/docs)

---

**¿Necesitas ayuda?** Revisa los logs o contacta soporte de Google Cloud.

