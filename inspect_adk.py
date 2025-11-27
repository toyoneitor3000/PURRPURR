import inspect
from google.adk.agents import config_agent_utils
from google.adk.agents.config_agent_utils import from_config
import sys
import pprint

print("Inspecting from_config signature:")
try:
    print(inspect.signature(from_config))
except ValueError:
    print("Could not get signature")

# Try to load the agent to see its type and attributes
try:
    from pathlib import Path
    # Assuming we are running from root, point to the yaml
    yaml_path = Path("PURRPURRAGENT/purrpurragent/root_agent.yaml")
    if yaml_path.exists():
        print(f"\nLoading agent from {yaml_path}...")
        sys.path.append("PURRPURRAGENT")
        
        agent = from_config(str(yaml_path.absolute()))
        print(f"Agent type: {type(agent)}")
        print("Agent dir:")
        pprint.pprint(dir(agent))
        print("\nAgent dict:")
        pprint.pprint(agent.__dict__)
        
    else:
        print("YAML not found")
except Exception as e:
    print(f"Error loading agent: {e}")
