# Scripts de Shell para el Proyecto Purrpurr

Esta carpeta contiene scripts de shell para automatizar tareas comunes en el proyecto, como despliegues y ejecución de servidores de desarrollo.

## Scripts Disponibles

1.  **`deploy_adk_cloudrun.sh`**: Despliega el sistema de agentes ADK en Google Cloud Run. Este script automatiza los pasos necesarios para empaquetar y desplegar la aplicación, haciéndola accesible a través de una URL pública.

2.  **`deploy_now.sh`**: Es un script de despliegue general. Puede ser utilizado para desplegar la aplicación en plataformas como Vercel o Netlify.

3.  **`start_adk.sh`**: Inicia el servidor de desarrollo local para el sistema de agentes ADK. Configura el entorno y ejecuta el servidor, permitiendo probar los agentes localmente.

4.  **`start_agent_web.sh`**: Inicia la interfaz web del agente en modo de desarrollo. Este script es útil para probar la interacción con los agentes a través de la interfaz de usuario web.

## Uso

Para ejecutar cualquiera de estos scripts, asegúrate de que tengan permisos de ejecución. Puedes otorgar permisos con el siguiente comando:

```bash
chmod +x nombre_del_script.sh
```

Luego, puedes ejecutarlos de la siguiente manera:

```bash
./nombre_del_script.sh
```
