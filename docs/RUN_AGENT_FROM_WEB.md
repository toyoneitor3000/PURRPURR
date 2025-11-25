# 🌐 Cómo Ejecutar el Agente desde la Web

Guía paso a paso para acceder al agente Purrpur desde tu navegador web.

---

## 📋 Requisitos Previos

1. ✅ Python 3.10+ con entorno virtual activado
2. ✅ Dependencias instaladas (`pip install -r requirements.txt`)
3. ✅ Node.js instalado para Next.js
4. ✅ Servidor ADK corriendo

---

## 🚀 Opción 1: Desarrollo Local (Recomendado para empezar)

### Paso 1: Iniciar el Servidor ADK

Abre una terminal y ejecuta:

```bash
cd "/Users/camilotoloza/Library/CloudStorage/GoogleDrive-camilotoloza1136@gmail.com/My Drive/PURPUR/purpur-landing-page"
source .venv/bin/activate
./start_adk.sh
```

Deberías ver:
```
🚀 Iniciando ADK Web Server...
🌐 Accede en: http://127.0.0.1:8000
INFO:     Application startup complete.
```

**⚠️ IMPORTANTE:** Deja esta terminal abierta. El servidor ADK debe seguir corriendo.

### Paso 2: Configurar Variables de Entorno en Next.js

Crea un archivo `.env.local` en `purrpurr_web/`:

```bash
cd purrpurr_web
cp .env.local.example .env.local
```

Edita `.env.local` y asegúrate de que tenga:

```bash
ADK_SERVER_URL=http://localhost:8000
```

### Paso 3: Iniciar el Servidor Next.js

Abre **otra terminal** (deja la primera con ADK corriendo) y ejecuta:

```bash
cd purrpurr_web
npm install  # Solo la primera vez
npm run dev
```

Deberías ver:
```
▲ Next.js 16.0.3
- Local:        http://localhost:3000
```

### Paso 4: Acceder a la Interfaz Web

Abre tu navegador y ve a:

**http://localhost:3000/agent**

Deberías ver la interfaz de chat del agente Purrpur.

---

## 🔧 Opción 2: Verificar que Todo Funciona

### Verificar Servidor ADK

1. Abre http://localhost:8000 en tu navegador
2. Deberías ver la interfaz web de ADK (si ADK la expone)

O verifica con curl:

```bash
curl http://localhost:8000/health
# O
curl http://localhost:8000/api/health
```

### Verificar API Route de Next.js

```bash
curl http://localhost:3000/api/agent
```

Deberías recibir un JSON con el estado de conexión.

### Probar el Chat

1. Ve a http://localhost:3000/agent
2. Escribe un mensaje como: "Hola, ¿qué puedes hacer?"
3. Presiona Enter o haz clic en "Send"
4. Deberías recibir una respuesta del agente

---

## 🐛 Troubleshooting

### Problema: "Failed to connect to agent"

**Causa:** El servidor ADK no está corriendo o la URL es incorrecta.

**Solución:**
1. Verifica que ADK esté corriendo: `lsof -ti:8000`
2. Verifica la variable `ADK_SERVER_URL` en `.env.local`
3. Reinicia ambos servidores

### Problema: "ADK server error: 404"

**Causa:** El endpoint de ADK no es el correcto.

**Solución:**
1. Verifica qué endpoints expone ADK visitando http://localhost:8000/docs (si ADK expone docs)
2. Ajusta el endpoint en `purrpurr_web/src/app/api/agent/route.ts`
3. Los endpoints comunes de ADK son:
   - `/api/v1/chat`
   - `/chat`
   - `/api/chat`
   - `/agents/purrpurragent/chat`

### Problema: CORS Error

**Causa:** ADK no permite requests desde localhost:3000.

**Solución:**
- ADK debería permitir CORS por defecto en desarrollo
- Si no, necesitas configurar CORS en el servidor ADK

### Problema: Puerto 8000 ya en uso

**Causa:** Hay otro proceso usando el puerto.

**Solución:**
```bash
# Ver qué proceso está usando el puerto
lsof -ti:8000

# Detener procesos ADK anteriores
pkill -f "adk web"

# O usar otro puerto
ADK_PORT=8001 ./start_adk.sh
# Y actualizar .env.local: ADK_SERVER_URL=http://localhost:8001
```

---

## 🌍 Opción 3: Desplegar en Producción

Para que el agente esté accesible desde cualquier lugar:

### Opción A: Servidor ADK Separado + Next.js en Vercel

1. **Desplegar ADK** en Cloud Run / Railway / Render
   - Ver guía: `docs/AGENT_DEPLOYMENT.md`

2. **Configurar Vercel** con la URL del servidor ADK:
   ```
   ADK_SERVER_URL=https://tu-adk-server.run.app
   ```

3. **Desplegar Next.js** en Vercel:
   ```bash
   cd purrpurr_web
   vercel deploy --prod
   ```

### Opción B: Todo en Vercel (Limitado)

- ADK como Serverless Function (timeout limitado)
- Solo para pruebas, no recomendado para producción

---

## 📝 Estructura de Archivos

```
purpur-landing-page/
├── purrpurragent/          # Agente Python
│   ├── root_agent.yaml
│   └── tools/
├── purrpurr_web/           # Interfaz Next.js
│   ├── src/
│   │   ├── app/
│   │   │   ├── agent/      # Página del agente
│   │   │   └── api/
│   │   │       └── agent/  # API Route proxy
│   └── .env.local          # Variables de entorno
└── start_adk.sh           # Script para iniciar ADK
```

---

## ✅ Checklist Rápido

- [ ] Servidor ADK corriendo en puerto 8000
- [ ] Archivo `.env.local` creado en `purrpurr_web/`
- [ ] Variable `ADK_SERVER_URL=http://localhost:8000` configurada
- [ ] Servidor Next.js corriendo en puerto 3000
- [ ] Navegador abierto en http://localhost:3000/agent
- [ ] Puedo enviar mensajes y recibir respuestas

---

## 🎯 Próximos Pasos

Una vez que funcione localmente:

1. **Probar todas las herramientas** desde la interfaz web
2. **Configurar autenticación** si planeas exponerlo públicamente
3. **Desplegar en producción** siguiendo `docs/AGENT_DEPLOYMENT.md`
4. **Configurar monitoreo** y alertas

---

**¿Necesitas ayuda?** Revisa:
- `purrpurragent/PRODUCTION_CHECKLIST.md` - Checklist completo
- `docs/AGENT_DEPLOYMENT.md` - Guía de deployment
- `purrpurragent/QUICK_START.md` - Inicio rápido

