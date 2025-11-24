# 🌍 Desplegar Agente Purrpur para Acceso Público

Guía completa para desplegar el agente Purrpur y que sea accesible desde cualquier dispositivo con internet.

---

## 🎯 Arquitectura

```
┌─────────────────┐         ┌──────────────────┐         ┌──────────────┐
│   Usuario Web   │ ──────> │  Next.js (Vercel)│ ──────> │ ADK (Cloud)  │
│  Cualquier      │         │  Interfaz Web     │         │  Servidor    │
│  Dispositivo    │         │  /agent           │         │  Python      │
└─────────────────┘         └──────────────────┘         └──────────────┘
```

**Componentes:**
1. **Servidor ADK** → Cloud Run / Railway / Render (Python)
2. **Interfaz Web** → Vercel (Next.js)
3. **Variables de Entorno** → Configuradas en cada plataforma

---

## 🚀 Opción 1: Google Cloud Run (Recomendado)

### Paso 1: Preparar Dockerfile para ADK

Crea `Dockerfile.adk` en la raíz del proyecto:

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
COPY start_adk.sh .

# Exponer puerto
EXPOSE 8080

# Variables de entorno
ENV PORT=8080
ENV ADK_HOST=0.0.0.0
ENV ADK_PORT=8080

# Iniciar servidor ADK
CMD ["python", "-m", "adk", "web", "purrpurragent/", "--host", "0.0.0.0", "--port", "8080"]
```

### Paso 2: Build y Deploy en Cloud Run

```bash
# Configurar proyecto
export PROJECT_ID="tu-proyecto-gcp"
gcloud config set project $PROJECT_ID

# Build de la imagen
gcloud builds submit --tag gcr.io/$PROJECT_ID/purrpur-adk

# Deploy en Cloud Run
gcloud run deploy purrpur-adk \
  --image gcr.io/$PROJECT_ID/purrpur-adk \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --memory 2Gi \
  --cpu 2 \
  --timeout 300 \
  --set-env-vars "GOOGLE_CLOUD_PROJECT=$PROJECT_ID,GOOGLE_CLOUD_LOCATION=us-central1"

# Obtener URL pública
gcloud run services describe purrpur-adk --region us-central1 --format 'value(status.url)'
```

**Guarda la URL que te devuelve**, será algo como: `https://purrpur-adk-xxxxx.run.app`

### Paso 3: Configurar Vercel

1. **Conecta tu repositorio** en https://vercel.com/new
2. **Configura el proyecto:**
   - Root Directory: `purrpurr_web`
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Agrega Variables de Entorno:**
   ```
   ADK_SERVER_URL=https://purrpur-adk-xxxxx.run.app
   ```

4. **Deploy:**
   ```bash
   cd purrpurr_web
   vercel deploy --prod
   ```

### Paso 4: Verificar

1. Abre la URL de Vercel: `https://tu-app.vercel.app/agent`
2. Deberías poder acceder desde cualquier dispositivo

---

## 🚀 Opción 2: Railway (Más Simple)

### Paso 1: Crear railway.json

```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "adk web purrpurragent/ --host 0.0.0.0 --port $PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Paso 2: Deploy en Railway

1. Ve a https://railway.app
2. **New Project** → **Deploy from GitHub**
3. Selecciona tu repositorio
4. Railway detectará automáticamente Python
5. Agrega variables de entorno:
   ```
   GOOGLE_CLOUD_PROJECT=tu-proyecto
   GOOGLE_CLOUD_LOCATION=us-central1
   ```
6. Railway te dará una URL pública: `https://purrpur-adk.up.railway.app`

### Paso 3: Configurar Vercel

Igual que Opción 1, pero usa la URL de Railway:
```
ADK_SERVER_URL=https://purrpur-adk.up.railway.app
```

---

## 🚀 Opción 3: Render (Alternativa)

### Paso 1: Crear render.yaml

```yaml
services:
  - type: web
    name: purrpur-adk
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: adk web purrpurragent/ --host 0.0.0.0 --port $PORT
    envVars:
      - key: GOOGLE_CLOUD_PROJECT
        value: tu-proyecto
      - key: GOOGLE_CLOUD_LOCATION
        value: us-central1
```

### Paso 2: Deploy

1. Ve a https://render.com
2. **New** → **Web Service**
3. Conecta GitHub y selecciona el repositorio
4. Render detectará `render.yaml` automáticamente
5. Obtendrás URL: `https://purrpur-adk.onrender.com`

---

## 🔐 Configurar Variables de Entorno

### En Cloud Run / Railway / Render:

```bash
GOOGLE_CLOUD_PROJECT=tu-proyecto-gcp
GOOGLE_CLOUD_LOCATION=us-central1
GOOGLE_APPLICATION_CREDENTIALS=/path/to/credentials.json  # O usar ADC
GITHUB_TOKEN=ghp_xxxxx  # Si necesitas GitHub
VERCEL_TOKEN=vercel_xxxxx  # Si necesitas Vercel
```

### En Vercel (Next.js):

```
ADK_SERVER_URL=https://tu-adk-server.run.app
# O la URL que te dé Railway/Render
```

---

## ✅ Checklist de Deployment

- [ ] Servidor ADK desplegado y accesible públicamente
- [ ] URL pública del servidor ADK guardada
- [ ] Variables de entorno configuradas en ADK server
- [ ] Next.js desplegado en Vercel
- [ ] Variable `ADK_SERVER_URL` configurada en Vercel
- [ ] Puedo acceder a `https://tu-app.vercel.app/agent` desde cualquier dispositivo
- [ ] El agente responde correctamente

---

## 🧪 Probar desde Cualquier Dispositivo

1. **Desde tu teléfono:**
   - Abre el navegador
   - Ve a: `https://tu-app.vercel.app/agent`
   - Envía un mensaje de prueba

2. **Desde otra computadora:**
   - Abre el navegador
   - Ve a la misma URL
   - Verifica que funcione

3. **Verificar logs:**
   - Cloud Run: `gcloud run services logs read purrpur-adk`
   - Railway: Dashboard → Logs
   - Render: Dashboard → Logs
   - Vercel: Dashboard → Functions → Logs

---

## 🐛 Troubleshooting

### Problema: "Failed to connect to agent"

**Causa:** La URL de ADK no es accesible públicamente.

**Solución:**
1. Verifica que el servidor ADK esté corriendo:
   ```bash
   curl https://tu-adk-server.run.app/health
   ```
2. Verifica CORS está habilitado en ADK
3. Verifica que `ADK_SERVER_URL` en Vercel sea correcta

### Problema: Timeout

**Causa:** El agente tarda mucho en responder.

**Solución:**
- Aumenta timeout en Cloud Run: `--timeout 300`
- Aumenta memoria: `--memory 4Gi`

### Problema: CORS Error

**Causa:** ADK no permite requests desde Vercel.

**Solución:**
- ADK debería permitir CORS por defecto
- Si no, configura CORS en el servidor ADK

---

## 📊 Monitoreo

### Métricas a Revisar:

1. **Cloud Run / Railway / Render:**
   - CPU usage
   - Memory usage
   - Request count
   - Error rate

2. **Vercel:**
   - Function invocations
   - Response times
   - Error rate

### Alertas Recomendadas:

- Error rate > 5%
- Response time > 30s
- Servidor ADK no disponible

---

## 🔒 Seguridad

### Recomendaciones:

1. **Rate Limiting:** Implementa límites de requests por IP
2. **Autenticación:** Considera agregar login si es público
3. **HTTPS:** Siempre usar HTTPS (Vercel y Cloud Run lo hacen automáticamente)
4. **API Keys:** Protege endpoints sensibles con API keys

---

## 🎉 ¡Listo!

Una vez completado, tu agente estará accesible desde:
- ✅ Cualquier dispositivo con internet
- ✅ Cualquier navegador
- ✅ Cualquier ubicación geográfica

**URL pública:** `https://tu-app.vercel.app/agent`

---

**¿Necesitas ayuda?** Revisa:
- `docs/AGENT_DEPLOYMENT.md` - Guía técnica detallada
- `purrpurragent/PRODUCTION_CHECKLIST.md` - Checklist completo

