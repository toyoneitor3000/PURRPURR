import os
import sys
import subprocess
from pathlib import Path

# Master list of ALL available tools
ALL_TOOLS = [
    "purrpurragent.tools.command_tools.command_runner",
    "purrpurragent.tools.deploy_tools.request_deploy_approval",
    "purrpurragent.tools.deploy_tools.vercel_deploy_trigger",
    "purrpurragent.tools.deploy_tools.infra_preview",
    "purrpurragent.tools.repo_tools.read_files",
    "purrpurragent.tools.repo_tools.write_files",
    "purrpurragent.tools.repo_tools.search_files",
    "purrpurragent.tools.search_tools.google_search",
    "purrpurragent.tools.design_tools.design_tokens_sync",
    "purrpurragent.tools.design_tools.brand_library_lookup",
    "purrpurragent.tools.scaffold_tools.next_scaffolder",
    "purrpurragent.tools.scaffold_tools.auth_module_generator",
    "purrpurragent.tools.image_generation_tools.generate_image",
    "purrpurragent.tools.image_generation_tools.edit_image"
]

BASE_DIR = Path(__file__).resolve().parent

def check_gcloud_auth():
    """Verifica si el usuario ha iniciado sesión con gcloud activamente."""
    print("🔍 Verificando sesión activa de Google Cloud...")
    
    try:
        # Intenta obtener la cuenta activa
        result = subprocess.run(
            ["gcloud", "auth", "list", "--filter=status:ACTIVE", "--format=value(account)"],
            capture_output=True,
            text=True
        )
        
        active_account = result.stdout.strip()
        
        if active_account:
            print(f"✅ Sesión activa encontrada: {active_account}")
            return True
        else:
            print("\n-------------------------------------------------------------------")
            print("🚨 ERROR: No se detectó una sesión activa de Google Cloud.")
            print("-------------------------------------------------------------------")
            print("Para usar las herramientas, debes iniciar sesión primero.")
            print("Por favor, ejecuta el siguiente comando en tu terminal:")
            print("\n    \n")
            print("-------------------------------------------------------------------")
            sys.exit(1)
            
    except FileNotFoundError:
        print("🚨 ERROR: 'gcloud' no está instalado o no se encuentra en el PATH.")
        sys.exit(1)

def update_agent_config(file_path):
    try:
        with open(file_path, 'r') as f:
            content = f.read()
        
        tools_block = "tools:\n" + "\n".join([f"  - name: {tool}" for tool in ALL_TOOLS])
        
        if "tools:" in content:
            lines = content.split('\n')
            new_lines = []
            skip_mode = False
            tools_inserted = False
            
            for line in lines:
                if line.strip().startswith("tools:"):
                    new_lines.append(tools_block)
                    skip_mode = True
                    tools_inserted = True
                elif skip_mode and (line.strip().startswith("- name:") or line.strip() == "" or line.startswith("  ")):
                    continue
                elif skip_mode:
                    if line.strip() != "":
                        skip_mode = False
                        new_lines.append(line)
                else:
                    new_lines.append(line)
            
            if not tools_inserted:
                new_lines.append(tools_block)
                
            new_content = "\n".join(new_lines)
            
        else:
            new_content = content + "\n" + tools_block
            
        with open(file_path, 'w') as f:
            f.write(new_content)
            
        print(f"✅ Configuración de herramientas actualizada en {file_path.name}")
        
    except Exception as e:
        print(f"❌ Error actualizando {file_path.name}: {e}")

def main():
    # Primero, verificar la autenticación estricta
    check_gcloud_auth()

    # Luego, proceder a actualizar los archivos de configuración
    print("\n🔄 Actualizando la configuración de herramientas en todos los agentes...")
    for root, dirs, files in os.walk(BASE_DIR):
        for file in files:
            if file.endswith("_agent.yaml"):
                update_agent_config(Path(root) / file)
    print("\n✨ Proceso completado.")

if __name__ == "__main__":
    main()
