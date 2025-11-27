# 🧪 Guía de Pruebas - Timeout Extendido ADK

## ✅ Verificación Completada

Los timeouts de ADK han sido actualizados exitosamente:

### Valores Anteriores vs Nuevos

| Parámetro | Antes | Ahora | Mejora |
|-----------|-------|-------|--------|
| **Timeout de Conexión** | 5 segundos | 600 segundos (10 min) | 120x más |
| **Timeout de Lectura/Ejecución** | 300 segundos (5 min) | 3600 segundos (1 hora) | 12x más |

---

## 📋 Pruebas Realizadas

### ✅ Prueba 1: Verificación de Configuración
**Archivo:** `test_timeouts.py`

**Resultado:** ✅ EXITOSO

Todos los valores de timeout se actualizaron correctamente:
- StdioConnectionParams: 600s
- SseConnectionParams: 600s conexión, 3600s lectura
- StreamableHTTPConnectionParams: 600s conexión, 3600s lectura

---

## 🧪 Cómo Probar en Producción

### Opción 1: Prueba Rápida (3 minutos)
```bash
python3 test_long_command.py
```
Este comando ejecutará por 180 segundos (3 minutos), superando el límite anterior de 120 segundos.

### Opción 2: Prueba Extendida (5 minutos)
```bash
python3 test_long_command.py 300
```

### Opción 3: Prueba Larga (10 minutos)
```bash
python3 test_long_command.py 600
```

### Opción 4: Prueba Extrema (30 minutos)
```bash
python3 test_long_command.py 1800
```

---

## 🤖 Prueba con el Agente ADK

Una vez que el servidor ADK esté completamente iniciado, puedes probar con el agente:

1. **Accede a la interfaz web:** http://127.0.0.1:8000

2. **Pide al agente que ejecute un comando largo:**
   ```
   Ejecuta el siguiente comando: python3 test_long_command.py 180
   ```

3. **Observa que el comando se complete sin errores de timeout**

---

## 📊 Qué Esperar

### ✅ Comportamiento Correcto
- El comando se ejecuta completamente
- Ves actualizaciones de progreso cada 10 segundos
- Al final aparece el mensaje "✅ ¡Comando completado exitosamente!"
- No hay errores de timeout

### ❌ Si Algo Sale Mal
Si ves un error como:
```
TimeoutError: Command execution timed out after 120 seconds
```

Esto significaría que los cambios no se aplicaron. En ese caso:
1. Verifica que el servidor ADK se reinició correctamente
2. Confirma que el archivo `mcp_session_manager.py` tiene los nuevos valores
3. Reinicia el servidor ADK nuevamente

---

## 🔧 Archivos Modificados

**Archivo Principal:**
```
.venv/lib/python3.14/site-packages/google/adk/tools/mcp_tool/mcp_session_manager.py
```

**Líneas modificadas:**
- Línea 63: `timeout: float = 600.0`
- Línea 83: `timeout: float = 600.0`
- Línea 84: `sse_read_timeout: float = 3600.0`
- Línea 106: `timeout: float = 600.0`
- Línea 107: `sse_read_timeout: float = 3600.0`
- Línea 176: `timeout=600`

---

## ⚠️ Notas Importantes

1. **Persistencia de Cambios:** 
   - Estos cambios están en el entorno virtual `.venv`
   - Si reinstalar o actualizar ADK, los cambios se perderán
   - Guarda una copia de este archivo modificado para restaurarlo si es necesario

2. **Backup del Archivo Original:**
   ```bash
   # Si necesitas restaurar el archivo original
   pip install --force-reinstall google-adk
   ```

3. **Recomendación:**
   - Para proyectos en producción, considera configurar estos valores en tu código
   - Usa `StdioConnectionParams`, `SseConnectionParams`, o `StreamableHTTPConnectionParams`
   - Pasa los parámetros de timeout personalizados al inicializar

---

## 🎯 Próximos Pasos

1. ✅ Verificar que el servidor ADK termine de iniciar
2. ✅ Ejecutar `test_long_command.py` para confirmar funcionamiento
3. ✅ Probar con el agente en la interfaz web
4. ✅ Monitorear comandos largos en producción

---

**Fecha de Modificación:** 2025-11-26
**Versión ADK:** 1.19.0
**Python:** 3.14
