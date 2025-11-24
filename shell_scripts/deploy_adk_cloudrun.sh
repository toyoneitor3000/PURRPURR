#!/bin/bash
# Script para desplegar el servidor ADK en Google Cloud Run

# Cambiar al directorio raíz del proyecto
cd "$(dirname "$0")/.."

set -e

echo "🎨 =========================================="
echo "   PURRPUR AGENT - DEPLOYMENT CLOUD RUN"
echo "=========================================="
echo ""

# Verificar que gcloud esté instalado
if ! command -v gcloud &> /dev/null; then
    echo "❌ Error: gcloud CLI no está instalado"
    echo "   Instala desde: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Verificar que Dockerfile existe
if [ ! -f "Dockerfile.adk" ]; then
    echo "❌ Error: Dockerfile.adk no encontrado"
    echo "   Asegúrate de estar en el directorio raíz del proyecto"
    exit 1
fi

# Verificar autenticación
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo "⚠️  No estás autenticado en gcloud"
    echo "   Ejecutando: gcloud auth login"
    gcloud auth login
fi

# Obtener proyecto actual o solicitar
CURRENT_PROJECT=$(gcloud config get-value project 2>/dev/null || echo "")

if [ -z "$CURRENT_PROJECT" ]; then
    echo "📋 Listando proyectos disponibles..."
    gcloud projects list --format="table(projectId,name)"
    echo ""
    read -p "📋 Ingresa tu PROJECT_ID de Google Cloud: " PROJECT_ID
else
    echo "📋 Proyecto actual: $CURRENT_PROJECT"
    read -p "¿Usar este proyecto? (s/n): " USE_CURRENT
    if [[ "$USE_CURRENT" =~ ^[Ss]$ ]]; then
        PROJECT_ID=$CURRENT_PROJECT
    else
        read -p "📋 Ingresa tu PROJECT_ID de Google Cloud: " PROJECT_ID
    fi
fi

if [ -z "$PROJECT_ID" ]; then
    echo "❌ PROJECT_ID es requerido"
    exit 1
fi

# Configurar proyecto
echo ""
echo "🔧 Configurando proyecto: $PROJECT_ID"
gcloud config set project $PROJECT_ID

# Habilitar APIs necesarias
echo ""
echo "🔌 Habilitando APIs necesarias..."
gcloud services enable run.googleapis.com cloudbuild.googleapis.com containerregistry.googleapis.com --quiet

# Build de la imagen
echo ""
echo "🔨 Construyendo imagen Docker..."
echo "   Esto puede tomar 5-10 minutos..."
gcloud builds submit --tag gcr.io/$PROJECT_ID/purrpur-adk

# Deploy en Cloud Run
echo ""
echo "🚀 Desplegando en Cloud Run..."
echo "   Esto puede tomar 2-3 minutos..."
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

# Verificar que funciona
echo "🧪 Verificando deployment..."
if curl -s -f "$ADK_URL/health" > /dev/null 2>&1 || curl -s -f "$ADK_URL" > /dev/null 2>&1; then
    echo "   ✅ Servidor responde correctamente"
else
    echo "   ⚠️  El servidor puede tardar unos segundos en estar listo"
fi

echo ""
echo "🔧 Siguiente paso - Configurar Vercel:"
echo "   1. Ve a https://vercel.com/dashboard"
echo "   2. Selecciona tu proyecto (o crea uno nuevo)"
echo "   3. Ve a Settings → Environment Variables"
echo "   4. Agrega:"
echo "      Key: ADK_SERVER_URL"
echo "      Value: $ADK_URL"
echo "   5. Redespliega tu app Next.js"
echo ""
echo "🌐 Luego accede a: https://tu-app.vercel.app/agent"
echo ""
echo "📚 Para más detalles, ver: DEPLOY_CLOUDRUN.md"

