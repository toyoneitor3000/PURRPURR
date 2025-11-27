#!/usr/bin/env python3
"""
Script de prueba para simular un comando de larga duración.
Este script se puede usar para verificar que el timeout extendido funciona.
"""

import time
import sys

def long_running_command(duration_seconds=180):
    """
    Simula un comando que toma mucho tiempo en ejecutarse.
    
    Args:
        duration_seconds: Duración del comando en segundos (default: 3 minutos)
    """
    print(f"🚀 Iniciando comando de larga duración ({duration_seconds} segundos)...")
    print(f"⏰ Esto tomará aproximadamente {duration_seconds//60} minutos y {duration_seconds%60} segundos")
    print()
    
    start_time = time.time()
    interval = 10  # Actualizar cada 10 segundos
    
    while True:
        elapsed = time.time() - start_time
        if elapsed >= duration_seconds:
            break
            
        remaining = duration_seconds - elapsed
        progress = (elapsed / duration_seconds) * 100
        
        print(f"⏳ Progreso: {progress:.1f}% | Tiempo transcurrido: {int(elapsed)}s | Restante: {int(remaining)}s")
        time.sleep(interval)
    
    total_time = time.time() - start_time
    print()
    print(f"✅ ¡Comando completado exitosamente!")
    print(f"⏱️  Tiempo total: {total_time:.2f} segundos")
    print()
    print("🎉 Si ves este mensaje, significa que el timeout extendido está funcionando correctamente.")
    print("   Antes, este comando habría fallado después de 120 segundos.")

if __name__ == "__main__":
    # Por defecto, ejecutar por 3 minutos (180 segundos)
    # Esto es más que el límite anterior de 120 segundos
    duration = int(sys.argv[1]) if len(sys.argv) > 1 else 180
    long_running_command(duration)
