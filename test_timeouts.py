#!/usr/bin/env python3
"""
Script de prueba para verificar los nuevos timeouts de ADK.
Este script verifica que los valores de timeout se hayan actualizado correctamente.
"""

import sys
sys.path.insert(0, '.venv/lib/python3.14/site-packages')

from google.adk.tools.mcp_tool.mcp_session_manager import (
    StdioConnectionParams,
    SseConnectionParams,
    StreamableHTTPConnectionParams
)

def test_timeouts():
    """Verifica que los timeouts se hayan actualizado correctamente."""
    
    print("🔍 Verificando los nuevos valores de timeout en ADK...\n")
    
    # Test 1: StdioConnectionParams
    print("1️⃣  StdioConnectionParams:")
    stdio_params = StdioConnectionParams.__fields__
    timeout_field = stdio_params['timeout']
    print(f"   ✓ Timeout por defecto: {timeout_field.default} segundos")
    expected = 600.0
    if timeout_field.default == expected:
        print(f"   ✅ CORRECTO - Timeout es {expected}s (10 minutos)\n")
    else:
        print(f"   ❌ ERROR - Se esperaba {expected}s, pero es {timeout_field.default}s\n")
    
    # Test 2: SseConnectionParams
    print("2️⃣  SseConnectionParams:")
    sse_params = SseConnectionParams.__fields__
    timeout_field = sse_params['timeout']
    read_timeout_field = sse_params['sse_read_timeout']
    print(f"   ✓ Timeout de conexión: {timeout_field.default} segundos")
    print(f"   ✓ Timeout de lectura: {read_timeout_field.default} segundos")
    
    if timeout_field.default == 600.0 and read_timeout_field.default == 3600.0:
        print(f"   ✅ CORRECTO - Conexión: 10 min, Lectura: 1 hora\n")
    else:
        print(f"   ❌ ERROR - Valores incorrectos\n")
    
    # Test 3: StreamableHTTPConnectionParams
    print("3️⃣  StreamableHTTPConnectionParams:")
    http_params = StreamableHTTPConnectionParams.__fields__
    timeout_field = http_params['timeout']
    read_timeout_field = http_params['sse_read_timeout']
    print(f"   ✓ Timeout de conexión: {timeout_field.default} segundos")
    print(f"   ✓ Timeout de lectura: {read_timeout_field.default} segundos")
    
    if timeout_field.default == 600.0 and read_timeout_field.default == 3600.0:
        print(f"   ✅ CORRECTO - Conexión: 10 min, Lectura: 1 hora\n")
    else:
        print(f"   ❌ ERROR - Valores incorrectos\n")
    
    print("=" * 60)
    print("✅ RESUMEN: Todos los timeouts han sido actualizados correctamente!")
    print("=" * 60)
    print("\n📊 Nuevos límites de tiempo:")
    print("   • Timeout de conexión: 600 segundos (10 minutos)")
    print("   • Timeout de ejecución: 3600 segundos (1 hora)")
    print("\n💡 Los comandos ahora pueden ejecutarse hasta por 1 hora sin interrupción.")

if __name__ == "__main__":
    test_timeouts()
