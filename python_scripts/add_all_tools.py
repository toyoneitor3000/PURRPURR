
import os

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
    "purrpurragent.tools.scaffold_tools.auth_module_generator"
]

BASE_DIR = "/Users/camilotoloza/Library/CloudStorage/GoogleDrive-camilotoloza1136@gmail.com/My Drive/PURPUR/purpur-landing-page/purrpurragent"

def update_agent_config(file_path):
    try:
        with open(file_path, 'r') as f:
            content = f.read()
        
        # Simple string manipulation to avoid losing comments which yaml parsers might drop
        # We look for "tools:" and replace the whole block
        
        tools_block = "tools:\n" + "\n".join([f"  - name: {tool}" for tool in ALL_TOOLS])
        
        if "tools:" in content:
            # Find where tools starts
            start_idx = content.find("tools:")
            # Find where the next section starts (if any) or end of file
            # We assume tools is usually at the end or followed by something else at root level
            # But regex might be safer.
            # Actually, let's just append if it's empty or replace if it exists.
            
            # Strategy: Read lines, find "tools:", remove subsequent lines that start with "  -", insert new block
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
                    # Skip existing tools lines
                    continue
                elif skip_mode:
                    # We found a line that is NOT a tool definition (e.g. another root key or just unindented text)
                    # But we must be careful about empty lines.
                    if line.strip() != "":
                        skip_mode = False
                        new_lines.append(line)
                else:
                    new_lines.append(line)
            
            if not tools_inserted:
                # If we didn't find tools: (maybe it was commented out?), append it
                new_lines.append(tools_block)
                
            new_content = "\n".join(new_lines)
            
        else:
            # No tools section, append it
            new_content = content + "\n" + tools_block
            
        with open(file_path, 'w') as f:
            f.write(new_content)
            
        print(f"✅ Updated {file_path}")
        
    except Exception as e:
        print(f"❌ Error updating {file_path}: {e}")

def main():
    # Walk through all directories to find _agent.yaml files
    for root, dirs, files in os.walk(BASE_DIR):
        for file in files:
            if file.endswith("_agent.yaml"):
                update_agent_config(os.path.join(root, file))

if __name__ == "__main__":
    main()
