#!/bin/bash
# Script rápido para desplegar con tu PROJECT_ID actual

set -e

PROJECT_ID="able-armor-381700"

echo "🎨 =========================================="
echo "   PURRPUR AGENT - DEPLOYMENT CLOUD RUN"
echo "=========================================="
echo ""
echo "📋 Proyecto: $PROJECT_ID"
echo ""

# Verificar que gcloud esté instalado
if ! command -v gcloud &> /dev/null; then
    echo "❌ Error: gcloud CLI no está instalado"
    exit 1
fi

# Verificar autenticación
echo "🔐 Verificando autenticación..."
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" 2>/dev/null | grep -q .; then
    echo ""
    echo "⚠️  No estás autenticado en gcloud"
    echo ""
    echo "Por favor ejecuta en tu terminal:"
    echo "   gcloud auth login"
    echo ""
    echo "Esto abrirá tu navegador para autenticarte."
    echo "Después de autenticarte, vuelve a ejecutar este script."
    exit 1
fi

ACTIVE_ACCOUNT=$(gcloud config get-value account 2>/dev/null)
if [ -z "$ACTIVE_ACCOUNT" ] || [ "$ACTIVE_ACCOUNT" = "(unset)" ]; then
    echo ""
    echo "⚠️  No hay cuenta activa configurada"
    echo ""
    echo "Por favor ejecuta en tu terminal:"
    echo "   gcloud auth login"
    echo ""
    exit 1
fi

echo "   ✅ Autenticado como: $ACTIVE_ACCOUNT"

# Configurar proyecto
echo ""
echo "🔧 Configurando proyecto..."
gcloud config set project $PROJECT_ID

# Habilitar APIs
echo ""
echo "🔌 Habilitando APIs necesarias..."
gcloud services enable run.googleapis.com cloudbuild.googleapis.com containerregistry.googleapis.com --quiet

# Build
echo ""
echo "🔨 Construyendo imagen Docker (esto puede tomar 5-10 minutos)..."
# Cloud Build necesita Dockerfile (no Dockerfile.adk), así que lo copiamos temporalmente
if [ ! -f "Dockerfile" ]; then
    cp Dockerfile.adk Dockerfile
fi
gcloud builds submit --tag gcr.io/$PROJECT_ID/purrpur-adk

# Deploy
echo ""
echo "🚀 Desplegando en Cloud Run (esto puede tomar 2-3 minutos)..."
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

# Obtener URL
echo ""
echo "✅ Deployment completado!"
echo ""
ADK_URL=$(gcloud run services describe purrpur-adk --region us-central1 --format 'value(status.url)')
echo "📋 URL pública del servidor ADK:"
echo "   $ADK_URL"
echo ""
echo "🔧 Siguiente paso - Configurar Vercel:"
echo "   1. Ve a https://vercel.com/dashboard"
echo "   2. Settings → Environment Variables"
echo "   3. Agrega: ADK_SERVER_URL=$ADK_URL"
echo "   4. Redespliega Next.js"
echo ""
echo "🌐 Luego accede a: https://tu-app.vercel.app/agent"

