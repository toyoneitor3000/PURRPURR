# 🌐 Cómo Ejecutar el Agente desde la Web - Guía Rápida

## Pasos Rápidos

### 1. Iniciar Servidor ADK (Terminal 1)

```bash
source .venv/bin/activate
./start_adk.sh
```

Espera a ver: `INFO: Application startup complete.`

### 2. Configurar Variables (Solo primera vez)

```bash
cd purrpurr_web
echo "ADK_SERVER_URL=http://localhost:8000" > .env.local
```

### 3. Iniciar Next.js (Terminal 2)

```bash
cd purrpurr_web
npm install  # Solo primera vez
npm run dev
```

### 4. Abrir en Navegador

Ve a: **http://localhost:3000/agent**

¡Listo! Ya puedes chatear con el agente Purrpur desde tu navegador.

---

## Verificación Rápida

```bash
# Verificar que ADK está corriendo
curl http://localhost:8000/health

# Verificar que Next.js está corriendo  
curl http://localhost:3000/api/agent
```

---

## Troubleshooting

**Error: "Failed to connect"**
- Verifica que ADK esté corriendo: `lsof -ti:8000`
- Verifica `.env.local` tiene `ADK_SERVER_URL=http://localhost:8000`

**Puerto ocupado**
```bash
# Detener procesos anteriores
pkill -f "adk web"
pkill -f "next dev"
```

---

Para más detalles, ver: `docs/RUN_AGENT_FROM_WEB.md`

