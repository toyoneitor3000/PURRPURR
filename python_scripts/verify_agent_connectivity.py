import os
import yaml
import sys

def verify_agent(file_path, visited=None):
    if visited is None:
        visited = set()

    if file_path in visited:
        return True, []
    visited.add(file_path)

    if not os.path.exists(file_path):
        return False, [f"Missing file: {file_path}"]

    print(f"Checking: {file_path}")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)
    except Exception as e:
        return False, [f"Error parsing YAML {file_path}: {e}"]

    if not data:
        return True, []

    errors = []
    sub_agents = data.get('sub_agents', [])
    
    # Handle case where sub_agents might be None
    if sub_agents is None:
        sub_agents = []

    base_dir = os.path.dirname(file_path)

    for agent_conf in sub_agents:
        if 'config_path' in agent_conf:
            sub_path = agent_conf['config_path']
            # Assuming paths are relative to the current yaml file
            full_sub_path = os.path.join(base_dir, sub_path)
            # Normalize path
            full_sub_path = os.path.normpath(full_sub_path)
            
            success, sub_errors = verify_agent(full_sub_path, visited)
            if not success:
                errors.extend(sub_errors)
                errors.append(f"  Referenced from {file_path}")

    return len(errors) == 0, errors

if __name__ == "__main__":
    root_agent = "purrpurragent/root_agent.yaml"
    success, errors = verify_agent(root_agent)
    
    if success:
        print("\n✅ All agents are connected and files exist.")
    else:
        print("\n❌ Broken connections found:")
        for err in errors:
            print(err)
        sys.exit(1)
