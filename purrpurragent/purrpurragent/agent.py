"""
Agent module for Purrpur system.
Exposes root_agent for ADK to discover.
"""

from pathlib import Path
from google.adk.agents.config_agent_utils import from_config

# --- START PATCH: EXTEND TIMEOUT ---
try:
    import google.generativeai as genai
    from google.generativeai import types
    
    print("Patching google.generativeai.GenerativeModel for timeout (600s)...")
    
    _OriginalGenerativeModel = genai.GenerativeModel
    
    def _PatchedGenerativeModel(*args, **kwargs):
        # Create timeout config
        timeout_config = types.GenerateContentConfig(
            http_options=types.HttpOptions(timeout=600)
        )
        
        if 'generation_config' in kwargs:
            # If config is already present, we respect it but log warning if we can't check timeout.
            # Ideally we would merge, but for now we assume ADK doesn't set this.
            print(f"Warning: generation_config present in GenerativeModel init: {kwargs['generation_config']}")
        else:
            kwargs['generation_config'] = timeout_config
            
        return _OriginalGenerativeModel(*args, **kwargs)
            
    genai.GenerativeModel = _PatchedGenerativeModel
    print("Successfully patched google.generativeai.GenerativeModel")
except ImportError:
    print("google.generativeai not found, skipping patch.")
except Exception as e:
    print(f"Failed to patch google.generativeai: {e}")
# --- END PATCH ---

# Import all tools to ensure they're registered with ADK
import purrpurragent.tools.command_tools
import purrpurragent.tools.repo_tools
import purrpurragent.tools.deploy_tools
import purrpurragent.tools.scaffold_tools
import purrpurragent.tools.design_tools

# Load root agent from YAML
_config_path = Path(__file__).parent / "root_agent.yaml"
root_agent = from_config(str(_config_path))

__all__ = ['root_agent']
