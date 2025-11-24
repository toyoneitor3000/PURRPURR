
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    print("❌ Error: No GOOGLE_API_KEY found in .env")
    exit(1)

genai.configure(api_key=api_key)

print("🔍 Consultando modelos disponibles en la API...")
try:
    models = list(genai.list_models())
    found_3 = False
    for m in models:
        if "gemini" in m.name:
            print(f" - {m.name}")
            if "3.0" in m.name or "3-0" in m.name:
                found_3 = True
    
    if not found_3:
        print("\n⚠️ No se encontró explícitamente '3.0' en la lista. Podría estar en beta cerrada o requerir una versión de librería más nueva.")
        print(f"Versión de librería google-generativeai: {genai.__version__}")

except Exception as e:
    print(f"❌ Error consultando API: {e}")

