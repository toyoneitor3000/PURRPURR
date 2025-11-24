import os
import google.generativeai as genai
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv()

# ==========================================
# 🔑 Carga Segura de la Clave de API
# ==========================================
api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    raise ValueError("No se encontró la GOOGLE_API_KEY en el archivo .env")

# Configuración inicial
genai.configure(api_key=api_key)

# Definimos el modelo (¡CORREGIDO!)
model = genai.GenerativeModel('gemini-2.5-flash')

def probar_agente():
    print("🔄 Conectando con los servidores de Google...")
    
    try:
        # Prueba de generación
        response = model.generate_content("Responde corto: ¿Estás funcionando correctamente?")
        
        print("\n✅ ¡ÉXITO! Tu agente está vivo.")
        print("🤖 Respuesta del agente:", response.text)
        
    except Exception as e:
        print("\n❌ Error de conexión:", e)

if __name__ == "__main__":
    probar_agente()
