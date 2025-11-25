import os
import re
import glob

def audit_agents():
    root_dir = 'purrpurragent'
    all_yaml_files = set()
    
    # 1. Find all YAML files
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.yaml') or file.endswith('.yml'):
                # Normalize path to use forward slashes
                full_path = os.path.normpath(os.path.join(root, file)).replace('\\', '/')
                all_yaml_files.add(full_path)

    print(f"Total YAML agent files found: {len(all_yaml_files)}")

    referenced_files = set()
    broken_links = []
    potential_missing_subagents = []

    # 2. Analyze each file
    for file_path in all_yaml_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract sub_agents using Regex
            # Pattern for: - config_path: path/to/file.yaml
            matches = re.findall(r'config_path:\s*(.+)', content)
            
            current_dir = os.path.dirname(file_path)
            
            declared_subagents = []

            for match in matches:
                sub_path = match.strip().strip("'").strip('"')
                
                # Resolve relative path
                full_sub_path = os.path.normpath(os.path.join(current_dir, sub_path)).replace('\\', '/')
                
                declared_subagents.append(sub_path)
                
                if full_sub_path in all_yaml_files:
                    referenced_files.add(full_sub_path)
                else:
                    broken_links.append(f"❌ BROKEN LINK: '{file_path}' refers to '{sub_path}' (Resolved: {full_sub_path}) which does not exist.")

            # 3. Check for mentions in instructions vs declared sub_agents
            # Find words ending in _agent
            mentions = set(re.findall(r'\b([a-zA-Z0-9_]+_agent)\b', content))
            
            # Remove self reference (filename without extension)
            self_name = os.path.splitext(os.path.basename(file_path))[0]
            if self_name in mentions:
                mentions.remove(self_name)

            # We need to map declared subagents back to their simple names to compare
            declared_names = set()
            for ds in declared_subagents:
                name = os.path.splitext(os.path.basename(ds))[0]
                declared_names.add(name)
            
            for mention in mentions:
                # If mentioned but not in declared names
                if mention not in declared_names:
                    # Filter out common false positives if necessary, or strictly report
                    # Check if it's just the 'name: ...' field
                    if f"name: {mention}" in content:
                        continue
                    
                    potential_missing_subagents.append(f"⚠️  POTENTIAL MISSING CONNECTION in '{file_path}': Mentions '{mention}' but it is not in 'sub_agents'.")

        except Exception as e:
            print(f"Error reading {file_path}: {e}")

    # 4. Find Orphans
    # Root agent is not referenced by anyone, so we exclude it from orphans check if we want
    orphans = []
    for f in all_yaml_files:
        if f not in referenced_files:
            # Assume root_agent.yaml is the entry point
            if 'root_agent' in f:
                continue
            orphans.append(f)

    # Report
    print("\n--- 🔍 AUDIT REPORT ---")
    
    if broken_links:
        print("\n🔴 BROKEN LINKS (Files referenced but missing):")
        for l in broken_links:
            print(l)
    else:
        print("\n✅ No broken file links found.")

    if orphans:
        print("\n👻 ORPHAN AGENTS (Files exist but are never referenced):")
        for o in orphans:
            print(f"  - {o}")
    else:
        print("\n✅ No orphan agents found.")

    if potential_missing_subagents:
        print("\n⚠️  TEXT MENTIONS WITHOUT CONNECTION (Agent mentioned in text but not configured):")
        # Limit output if too many
        for p in potential_missing_subagents[:20]:
            print(p)
        if len(potential_missing_subagents) > 20:
            print(f"... and {len(potential_missing_subagents) - 20} more.")
    else:
        print("\n✅ All mentioned agents seem to be connected.")

if __name__ == "__main__":
    audit_agents()
