#!/bin/bash
# Script para iniciar tanto el servidor ADK como Next.js para acceder al agente desde la web

echo "🎨 =========================================="
echo "   PURRPUR AGENT - INICIO DESDE WEB"
echo "=========================================="
echo ""

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Directorio base
BASE_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$BASE_DIR"

# Verificar entorno virtual
if [ ! -f ".venv/bin/activate" ]; then
    echo -e "${YELLOW}⚠️  Entorno virtual no encontrado${NC}"
    echo "   Crea uno con: python3 -m venv .venv"
    exit 1
fi

# Verificar que ADK no esté ya corriendo
if lsof -ti:8000 > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Puerto 8000 ya en uso${NC}"
    echo "   Deteniendo procesos ADK anteriores..."
    pkill -f "adk web" 2>/dev/null || true
    sleep 2
fi

# Verificar que Next.js no esté ya corriendo
if lsof -ti:3000 > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Puerto 3000 ya en uso${NC}"
    echo "   Deteniendo procesos Next.js anteriores..."
    pkill -f "next dev" 2>/dev/null || true
    sleep 2
fi

# Crear .env.local si no existe
if [ ! -f "purrpurr_web/.env.local" ]; then
    echo -e "${BLUE}📝 Creando .env.local...${NC}"
    echo "ADK_SERVER_URL=http://localhost:8000" > purrpurr_web/.env.local
    echo -e "${GREEN}✅ Archivo .env.local creado${NC}"
fi

echo ""
echo -e "${BLUE}🚀 Iniciando servidores...${NC}"
echo ""
echo -e "${GREEN}Terminal 1:${NC} Servidor ADK (puerto 8000)"
echo -e "${GREEN}Terminal 2:${NC} Servidor Next.js (puerto 3000)"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANTE:${NC}"
echo "   1. Este script iniciará ADK en esta terminal"
echo "   2. Abre OTRA terminal y ejecuta:"
echo "      cd purrpurr_web && npm run dev"
echo "   3. Luego abre: http://localhost:3000/agent"
echo ""
echo -e "${BLUE}Presiona Enter para iniciar ADK...${NC}"
read

# Iniciar ADK
source .venv/bin/activate
echo -e "${GREEN}🚀 Iniciando ADK Web Server...${NC}"
echo ""
./start_adk.sh

