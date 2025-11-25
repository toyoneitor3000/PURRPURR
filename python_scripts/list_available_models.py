import os
import google.generativeai as genai
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Carga segura de la clave
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("No se encontró la GOOGLE_API_KEY en el archivo .env")

genai.configure(api_key=api_key)

print("🔍 Buscando modelos disponibles para tu clave...")

# Filtrar para mostrar solo los modelos que soportan 'generateContent'
for m in genai.list_models():
  if 'generateContent' in m.supported_generation_methods:
    print(f"- {m.name}")
