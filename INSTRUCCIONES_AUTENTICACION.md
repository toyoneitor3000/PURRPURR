# 🔐 Instrucciones de Autenticación para Google Cloud

Para poder desplegar en Cloud Run, necesitas autenticarte en la terminal con gcloud.

## Pasos Rápidos

### 1. Abre tu Terminal

Abre una terminal nueva (Terminal.app, iTerm, o la terminal integrada de Cursor).

### 2. Ejecuta el Comando de Autenticación

```bash
gcloud auth login
```

### 3. Sigue las Instrucciones

1. El comando abrirá tu navegador automáticamente
2. Selecciona tu cuenta de Google (la misma que usas en Google Cloud Console)
3. Autoriza el acceso
4. Copia el código de verificación que aparece
5. Pégalo en la terminal y presiona Enter

### 4. Verificar que Funcionó

```bash
gcloud auth list
```

Deberías ver tu cuenta de email listada.

### 5. Ejecutar el Script de Deployment

```bash
cd "/Users/camilotoloza/Library/CloudStorage/GoogleDrive-camilotoloza1136@gmail.com/My Drive/PURPUR/purpur-landing-page"
./deploy_now.sh
```

## Alternativa: Autenticación con Application Default Credentials

Si prefieres usar las credenciales de tu aplicación:

```bash
gcloud auth application-default login
```

Esto también abre el navegador y es útil si vas a usar las credenciales desde código Python.

## Troubleshooting

### Error: "No browser available"

```bash
# Usar autenticación sin navegador
gcloud auth login --no-launch-browser

# Te dará un link para copiar y pegar en el navegador
```

### Error: "Account already logged in"

```bash
# Ver cuentas disponibles
gcloud auth list

# Seleccionar una cuenta específica
gcloud config set account TU_EMAIL@gmail.com
```

### Verificar Proyecto Actual

```bash
gcloud config get-value project
```

Si no es `able-armor-381700`, configúralo:

```bash
gcloud config set project able-armor-381700
```

---

Una vez autenticado, el script `deploy_now.sh` funcionará correctamente.

