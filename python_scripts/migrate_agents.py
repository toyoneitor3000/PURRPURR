
import os
from pathlib import Path

# El bloque de texto antiguo que queremos eliminar/reemplazar
OLD_PROTOCOL_PART_1 = """**PROTOCOLO DE INTERACCIÓN (OBLIGATORIO)**:
  1. 🛑 **ANTES** de actuar: Pide confirmación explícita con tu plan detallado ("¿Procedo?").
  2. 🟢 **DESPUÉS** de actuar: NO te calles. Confirma el éxito ("✅ Archivos creados") y **GUÍA** al usuario al siguiente paso lógico (ej: "Ahora corre `npm run dev`", "Revisa el archivo X", "¿Quieres que implemente Y ahora?").


  **CONFIRMACIÓN HUMANA REQUERIDA**:
  Antes de ejecutar tu plan o finalizar, PRESENTA tu propuesta detallada y TERMINA con una pregunta pidiendo aprobación (ej: "¿Deseas que proceda?", "¿Apruebas este plan?"). NO ejecutes sin este "Sí" explícito."""

# Variación con saltos de línea escapados (a veces pasa en YAML multiline string)
OLD_PROTOCOL_ESCAPED = r"""**PROTOCOLO DE INTERACCIÓN (OBLIGATORIO)**:\n  1. 🛑 **ANTES** de actuar: Pide confirmación explícita con tu plan detallado (\"¿Procedo?\").\n  2. 🟢 **DESPUÉS** de actuar: NO te calles. Confirma el éxito (\"✅ Archivos creados\") y **GUÍA** al usuario al siguiente paso lógico (ej: \"Ahora corre `npm run dev`\", \"Revisa el archivo X\", \"¿Quieres que implemente Y ahora?\").\n\n\n  **CONFIRMACIÓN HUMANA REQUERIDA**:\n  Antes de ejecutar tu plan o finalizar, PRESENTA tu propuesta detallada y TERMINA con una pregunta pidiendo aprobación (ej: \"¿Deseas que proceda?\", \"¿Apruebas este plan?\"). NO ejecutes sin este \"Sí\" explícito."""

# El nuevo protocolo de autonomía
NEW_PROTOCOL = """**PROTOCOLO DE ACCIÓN AUTOMÁTICA (OBLIGATORIO)**:
  1. 🚀 **EJECUTA PRIMERO**: No pidas permiso. Si entiendes lo que hay que hacer, hazlo inmediatamente.
  2. ⚡ **AUTONOMÍA TOTAL**: Usa las herramientas directamente para cumplir el objetivo.
  3. 🟢 **REPORTE POST-ACCIÓN**: Solo informa al usuario DESPUÉS de haber completado la tarea o si hay un error bloqueante.
  4. ❌ **PROHIBIDO PREGUNTAR**: Evita frases como "¿Deseas proceder?". Asume que sí y avanza. Tu rol es resolver."""

NEW_PROTOCOL_ESCAPED = r"""**PROTOCOLO DE ACCIÓN AUTOMÁTICA (OBLIGATORIO)**:\n  1. 🚀 **EJECUTA PRIMERO**: No pidas permiso. Si entiendes lo que hay que hacer, hazlo inmediatamente.\n  2. ⚡ **AUTONOMÍA TOTAL**: Usa las herramientas directamente para cumplir el objetivo.\n  3. 🟢 **REPORTE POST-ACCIÓN**: Solo informa al usuario DESPUÉS de haber completado la tarea o si hay un error bloqueante.\n  4. ❌ **PROHIBIDO PREGUNTAR**: Evita frases como \"¿Deseas proceder?\". Asume que sí y avanza. Tu rol es resolver."""

def migrate_agents():
    base_path = Path("purrpurragent")
    yaml_files = list(base_path.rglob("*.yaml"))
    
    print(f"🔍 Analizando {len(yaml_files)} archivos YAML...")
    
    modified_count = 0
    
    for file_path in yaml_files:
        # Skip root agent as we already manually updated it
        if file_path.name == "root_agent.yaml":
            continue
            
        try:
            content = file_path.read_text(encoding="utf-8")
            original_content = content
            
            # Intentar reemplazo directo
            if "CONFIRMACIÓN HUMANA REQUERIDA" in content:
                # Estrategia 1: Reemplazo simple si coincide el bloque
                if OLD_PROTOCOL_PART_1 in content:
                    content = content.replace(OLD_PROTOCOL_PART_1, NEW_PROTOCOL)
                
                # Estrategia 2: Reemplazo de versión escapada (común en YAMLs "one-line")
                elif "Actúa como" in content or "instruction: \"" in content: 
                     # Buscar patrón escapado manualmente si falla el exacto
                     import re
                     # Patrón regex flexible para capturar el bloque restrictivo
                     pattern = r"\*\*PROTOCOLO DE INTERACCIÓN \(OBLIGATORIO\)\*\*:.*NO ejecutes sin este .Sí. explícito\."
                     content = re.sub(pattern, NEW_PROTOCOL_ESCAPED, content, flags=re.DOTALL)

                # Estrategia 3: Reemplazo genérico por si hay variaciones de espaciado
                else:
                     # Fallback: buscar solo la parte clave y reemplazar
                     part_to_remove = "Antes de ejecutar tu plan o finalizar, PRESENTA tu propuesta detallada"
                     if part_to_remove in content:
                         # Reemplazamos todo el bloque instruction si es necesario, o solo la parte final
                         # Aquí es más seguro notificar para revisión manual si no es match exacto
                         print(f"⚠️  Match parcial en {file_path.name}, intentando limpieza agresiva...")
                         import re
                         content = re.sub(r"\*\*PROTOCOLO DE INTERACCIÓN.*explícito\.", NEW_PROTOCOL, content, flags=re.DOTALL)

            if content != original_content:
                file_path.write_text(content, encoding="utf-8")
                print(f"✅ Actualizado: {file_path.name}")
                modified_count += 1
                
        except Exception as e:
            print(f"❌ Error en {file_path.name}: {e}")

    print(f"\n🎉 Migración completada. {modified_count} agentes liberados de la burocracia.")

if __name__ == "__main__":
    migrate_agents()

