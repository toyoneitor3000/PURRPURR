# Scripts de Mantenimiento de Agentes

Esta carpeta contiene scripts de Python para administrar y mantener el sistema de agentes Purrpurr.

## Scripts Disponibles

A continuación se enumeran los scripts y su propósito:

1.  **`add_all_tools.py`**: Agrega una lista completa de herramientas predefinidas a todos los archivos de configuración de agentes (`.yaml`). Es útil para asegurar que todos los agentes tengan acceso a un conjunto base de capacidades.

2.  **`add_confirmation.py`**: Modifica los agentes para incluir un paso de confirmación antes de ejecutar acciones críticas.

3.  **`add_search_tool_to_all.py`**: Agrega la herramienta de búsqueda de Google (`google_search`) a todos los agentes que no la tengan.

4.  **`audit_agents.py`**: Audita todos los agentes para generar un informe sobre sus configuraciones, herramientas y modelos.

5.  **`check_models.py`**: Verifica que los modelos de lenguaje especificados en los archivos de configuración de los agentes sean válidos y estén disponibles.

6.  **`fix_images.py`**: Corrige las rutas de las imágenes en los archivos del proyecto.

7.  **`migrate_agents.py`**: Ejecuta un proceso de migración en los archivos de configuración de los agentes para actualizarlos a una nueva estructura o formato.

8.  **`test_design_tool_update.py`**: Es un script de prueba para validar que la actualización de la herramienta de diseño funcione como se espera.

## Uso

Cada script se puede ejecutar de forma independiente desde la raíz del proyecto. Asegúrate de tener las dependencias necesarias instaladas.

```bash
python python_scripts/nombre_del_script.py
```
