# 🚀 Guía de Deployment del Agente Purrpur

Esta guía explica cómo desplegar el sistema de agentes Purrpur para que esté accesible desde el navegador web.

---

## 📋 Arquitectura

El sistema tiene dos componentes principales:

1. **Servidor ADK** (Python): Ejecuta el agente y procesa las solicitudes
2. **Interfaz Web** (Next.js): Proporciona la UI para interactuar con el agente

### Opciones de Deployment

#### Opción A: Servidor ADK Separado + Next.js en Vercel (Recomendado)
- ADK en Cloud Run / Railway / Render
- Next.js en Vercel
- Comunicación vía API HTTP

#### Opción B: Todo en Vercel (Serverless Functions)
- ADK como API Route en Next.js
- Más limitado pero más simple

---

## 🔧 Opción A: Servidor ADK Separado

### Paso 1: Desplegar Servidor ADK

#### En Google Cloud Run:

```bash
# 1. Crear Dockerfile para ADK
cat > Dockerfile.adk << EOF
FROM python:3.11-slim

WORKDIR /app

# Instalar dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código del agente
COPY purrpurragent/ ./purrpurragent/
COPY start_adk.sh .

# Exponer puerto
EXPOSE 8000

# Iniciar servidor ADK
CMD ["python", "-m", "adk", "web", "purrpurragent/", "--host", "0.0.0.0", "--port", "8000"]
EOF

# 2. Build y deploy
gcloud builds submit --tag gcr.io/PROJECT_ID/purrpur-adk
gcloud run deploy purrpur-adk \
  --image gcr.io/PROJECT_ID/purrpur-adk \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "GOOGLE_CLOUD_PROJECT=PROJECT_ID,GOOGLE_CLOUD_LOCATION=us-central1"
```

#### En Railway / Render:

1. Conecta tu repositorio GitHub
2. Configura el build command: `pip install -r requirements.txt`
3. Configura el start command: `adk web purrpurragent/ --host 0.0.0.0 --port $PORT`
4. Agrega todas las variables de entorno necesarias

### Paso 2: Configurar Variables en Vercel

En el dashboard de Vercel, agrega estas variables de entorno:

```bash
# URL del servidor ADK
ADK_SERVER_URL=https://purrpur-adk-xxxxx.run.app

# (Opcional) API Key si implementaste autenticación
ADK_API_KEY=your-api-key-here

# Variables de Google Cloud (si las necesitas en Next.js)
NEXT_PUBLIC_GOOGLE_CLOUD_PROJECT=your-project-id
```

### Paso 3: Desplegar Next.js en Vercel

```bash
cd purrpurr_web
vercel deploy --prod
```

O conecta el repositorio en Vercel Dashboard y configura:
- **Root Directory**: `purrpurr_web`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

---

## 🔧 Opción B: Todo en Vercel (Serverless)

### Limitaciones:
- Vercel Serverless Functions tienen timeout de 10s (Hobby) o 60s (Pro)
- ADK puede necesitar más tiempo para procesar solicitudes complejas
- No recomendado para producción con agentes complejos

### Implementación:

1. Crear API Route que ejecute ADK directamente:

```typescript
// purrpurr_web/src/app/api/agent-direct/route.ts
import { spawn } from 'child_process';

export async function POST(request: Request) {
  // Ejecutar ADK como subproceso
  // ⚠️ Esto puede exceder los límites de timeout de Vercel
}
```

---

## ✅ Checklist Pre-Deployment

Antes de desplegar, ejecuta:

```bash
# 1. Verificar herramientas
python3 purrpurragent/verify_tools.py

# 2. Verificar variables de entorno
python3 purrpurragent/verify_env.py  # (crear este script si no existe)

# 3. Probar servidor ADK localmente
./start_adk.sh
# Abre http://localhost:8000 y verifica que funciona

# 4. Probar interfaz web localmente
cd purrpurr_web
npm run dev
# Abre http://localhost:3000/agent y verifica conexión
```

---

## 🔐 Seguridad

### Variables Sensibles:
- ✅ **NUNCA** exponer tokens en el frontend
- ✅ Usar variables de entorno en Vercel (no `NEXT_PUBLIC_*` para secrets)
- ✅ Implementar rate limiting en API routes
- ✅ Validar autenticación si expones públicamente

### Rate Limiting (Ejemplo):

```typescript
// purrpurr_web/src/app/api/agent/route.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'),
});

export async function POST(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }
  
  // ... resto del código
}
```

---

## 🧪 Testing Post-Deployment

1. **Health Check**:
   ```bash
   curl https://tu-app.vercel.app/api/agent
   ```

2. **Probar Chat**:
   - Abre https://tu-app.vercel.app/agent
   - Envía un mensaje de prueba
   - Verifica que recibes respuesta

3. **Verificar Logs**:
   - Vercel Dashboard → Functions → Logs
   - Cloud Run → Logs (si usas Opción A)

---

## 📊 Monitoreo

### Métricas a Monitorear:
- Tiempo de respuesta del agente
- Tasa de errores
- Uso de recursos (CPU, memoria)
- Límites de rate limiting

### Alertas Recomendadas:
- Error rate > 5%
- Response time > 30s
- Servidor ADK no disponible

---

## 🐛 Troubleshooting

### Problema: "Failed to connect to agent"
- Verifica que `ADK_SERVER_URL` esté configurado correctamente
- Verifica que el servidor ADK esté corriendo y accesible
- Revisa los logs del servidor ADK

### Problema: "Timeout"
- Aumenta el timeout en Vercel (solo disponible en Pro)
- Considera usar Opción A (servidor separado)

### Problema: "Tool not found"
- Ejecuta `verify_tools.py` para verificar que todas las herramientas estén disponibles
- Verifica que las dependencias Python estén instaladas en el servidor ADK

---

## 📚 Recursos Adicionales

- [PRODUCTION_CHECKLIST.md](../purrpurragent/PRODUCTION_CHECKLIST.md) - Checklist completo
- [INTEGRATIONS.md](../purrpurragent/INTEGRATIONS.md) - Integración con GitHub/Vercel
- [QUICK_START.md](../purrpurragent/QUICK_START.md) - Inicio rápido local

---

**Última actualización:** 2025-01-XX

